fs           = require 'fs'
globule      = require('globule')
path         = require('path')
gerberToSvg  = require('gerber-to-svg')
yaml         = require('js-yaml')
Svgo         = require('svgo')
{checkArgs}  = require('./utils/utils')
boardBuilder = require('./utils/boardBuilder')

svgo = new Svgo
    full : true
    plugins : [
        { removeDoctype                  : true  }
        { removeXMLProcInst              : true  }
        { removeComments                 : true  }
        { removeMetadata                 : true  }
        { removeEditorsNSData            : true  }
        { cleanupAttrs                   : true  }
        { minifyStyles                   : true  }
        { convertStyleToAttrs            : true  }
        { cleanupIDs                     : true  }
        { removeRasterImages             : true  }
        { removeUselessDefs              : true  }
        { cleanupNumericValues           : true  }
        { cleanupListOfValues            : true  }
        { convertColors                  : true  }
        { removeUnknownsAndDefaults      : true  }
        { removeNonInheritableGroupAttrs : true  }
        { removeUselessStrokeAndFill     : true  }
        { removeViewBox                  : true  }
        { cleanupEnableBackground        : true  }
        { removeHiddenElems              : true  }
        { removeEmptyText                : true  }
        { convertShapeToPath             : true  }
        { moveElemsAttrsToGroup          : false }
        { moveGroupAttrsToElems          : true  }
        { collapseGroups                 : true  }
        { convertPathData                : true  }
        { convertTransform               : true  }
        { removeEmptyAttrs               : true  }
        { removeEmptyContainers          : true  }
        { mergePaths                     : true  }
        { removeUnusedNS                 : true  }
        { transformsWithOnePath          : true  }
        { sortAttrs                      : true  }
        { removeTitle                    : true  }
        { removeDesc                     : true  }
        { removeDimensions               : true  }
        { removeAttrs                    : true  }
        { addClassesToSVGElement         : false }
        { removeStyleElement             : false }
    ]

if require.main != module
    module.exports = (folder) ->
        try
            file = fs.readFileSync("#{folder}/kitnic.yaml")
        if file?
            info = yaml.safeLoad(file)
        if info?.gerbers?
            gerbers = globule.find("#{folder}/#{info.gerbers}/*")
        else
            gerbers = globule.find("#{folder}/gerbers/*")
        if gerbers.length == 0
            console.error("No gerbers found for #{folder}.")
            process.exit(1)
        deps = [folder].concat(gerbers)
        imageDir = folder.replace('boards', 'build/boards') + '/images'
        targets = [
            "#{imageDir}/top.svg"
            "#{imageDir}/bottom.svg"
        ]
        return {deps, targets}
else
    {deps, targets} = checkArgs(process.argv)
    folder = deps[0]
    gerbers = deps[1..]
    [topSvgPath, bottomSvgPath] = targets
    try
        file = fs.readFileSync("#{folder}/kitnic.yaml")
    try
        if file?
            info = yaml.safeLoad(file)
            stackup = boardBuilder(gerbers, info.color)
        else
            stackup = boardBuilder(gerbers)
    catch e
        console.error("Could not process gerbers for #{folder}")
        console.error(e)
        process.exit(1)
    top = gerberToSvg(stackup.top)
    bottom = gerberToSvg(stackup.bottom)
    svgo.optimize top, (result) ->
        fs.writeFileSync(topSvgPath, result.data)
    svgo.optimize bottom, (result) ->
        fs.writeFileSync(bottomSvgPath, result.data)