//TODO: add dark mode switch

const topDiv = document.getElementById("s4-bodyContainer");
var mainBody = document.createElement("div");
mainBody.className = "grid-container";
topDiv.appendChild(mainBody)

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

function addButtons (results) {
    links = results["SimpleSharepointUsed"];
    var cols = Math.ceil(Math.sqrt(links.length));
    var rows = Math.ceil(links.length/cols);
    console.log(rows);

    var gridStyle = document.createElement("style");
    gridStyle.type = "text/css";
    gridStyle.innerHTML = ".grid-container { \
            grid-template-columns: repeat(ROWCOUNT, auto); \
            display: grid; \
            grid-gap: 10px;} \
        .grid-item { \
            background-color: #3b3c48 !important; \
            height: 200px !important; \
            width: 200px !important; \
            border-radius: 30px !important; \
            cursor: pointer; } \
        #s4-bodyContainer { \
            height: 30vw; \
            width: 75vh !important; \
            padding-left: PADDINGWpx; \
            padding-top: PADDINGHpx; } \
        #s4-workspace { overflow: hidden; } \
        body { background-color: #14151f; }\
        .text { \
            color: white; \
            font-size: 1.5em;\
            width: 100%; \
            height: 75px; \
            line-height: 250%; \
            text-align: center; \
            margin-top: 125px; \
            border-radius: 0 0 30px 30px; \
            display: table; } \
        .ms-tableCell, .ms-table, #ms-designer-ribbon { display: none !important; }".replace("ROWCOUNT", cols).replace("PADDINGW", (w - (cols * 200)) / 2).replace("PADDINGH", (h - (rows * 200)) / 2);

    document.getElementsByTagName('head')[0].appendChild(gridStyle);
    for (var i = 0; i < links.length; i++) {
        var button = document.createElement("div");
        
        button.className = "grid-item";
        button.setAttribute("onclick", "window.open('" + links[i].link + "')");
        button.style.backgroundImage = "url('" + links[i].image + "')";
        button.style.backgroundSize = "cover";

        //button.value = links[i].name;

        var text = document.createElement("div");
        text.className = "text";
        text.innerText = links[i].name;
        text.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        button.appendChild(text);

        mainBody.appendChild(button);
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

var used = browser.storage.sync.get("SimpleSharepointUsed");
used.then(addButtons, onError);