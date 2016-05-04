pcbStackup  = require('pcb-stackup')
whatsThatGerber = require('whats-that-gerber')
gerberToSvg = require('gerber-to-svg')
shortId = require('shortid')

console.log(shortId)

# board colors
options =
    # copper finish
    cf:
        bare    : '#C87533'
        gold    : 'goldenrod'
        'Ni/Au' : 'whitesmoke'
        hasl    : 'silver'

    # soldermask
    sm:
        red    : {color: 'darkred' , opacity: 0.90}
        orange : {color: '#C36B00' , opacity: 0.90}
        yellow : {color: '#FFFF66' , opacity: 0.50}
        green  : {color: '#040'    , opacity: 0.90}
        blue   : {color: '#001E68' , opacity: 0.90}
        purple : {color: '#2E0051' , opacity: 0.90}
        black  : {color: 'black'   , opacity: 0.90}
        white  : {color: 'white'   , opacity: 0.90}

    # silkscreen
    ss:
        red    : 'red'
        yellow : 'yellow'
        green  : 'green'
        blue   : 'blue'
        black  : 'black'
        white  : 'white'



styleToSvgObj = ({copperFinish, solderMask, silkScreen}) ->
    style:
        type: 'text/css',
        _: " ._board-fr4 { color: #4D542C;}
             ._board-cu { color: lightgrey; }
             ._board-cf { color: #{options.cf[copperFinish]}; }
             ._board-sm { color: #{options.sm[solderMask].color}; opacity: #{options.sm[solderMask].opacity}; }
             ._board-ss { color: #{options.ss[silkScreen]}; }
             ._board-sp { color: silver; opacity: 0.0;}
             ._board-out { color: black; }"


colorToStyle =
    green:
        solderMask: 'green'
        copperFinish: 'gold'
        silkScreen: 'white'
    red:
        solderMask: 'red'
        copperFinish: 'gold'
        silkScreen: 'white'
    blue:
        solderMask: 'blue'
        copperFinish: 'hasl'
        silkScreen: 'white'
    black:
        solderMask: 'black'
        copperFinish: 'hasl'
        silkScreen: 'white'
    white:
        solderMask: 'white'
        copperFinish: 'gold'
        silkScreen: 'black'
    orange:
        solderMask: 'orange'
        copperFinish: 'hasl'
        silkScreen: 'white'
    purple:
        solderMask: 'purple'
        copperFinish: 'gold'
        silkScreen: 'white'
    yellow:
        solderMask: 'yellow'
        copperFinish: 'gold'
        silkScreen: 'black'

convert = (files, color = 'green') ->
    layers = []
    for {filename, data} in files
        {id, name} = whatsThatGerber(filename)
        if id != 'drw' #drw is the default for any un-identifiable filenames
            try
                svgObj = gerberToSvg data, filename,
                    id: shortId.generate()
                    object: true
                    drill: (id == 'drl')
                    warnArr: []
            catch e
                try
                    if id == 'drl'
                        throw e
                    svgObj = gerberToSvg(data, filename, {id:shortId.generate(), object: true, drill: true, warnArr: []})
                catch
                    console.warn "could not parse #{filename} as #{id} because
                                #{e.message}"
                    continue
                id = 'drl'
            layers.push({type: id, svg: svgObj})
    stackup = pcbStackup(layers. shortId.generate())
    stackup.top.svg._.push(styleToSvgObj(colorToStyle[color]))
    stackup.bottom.svg._.push(styleToSvgObj(colorToStyle[color]))
    return stackup

module.exports = convert
