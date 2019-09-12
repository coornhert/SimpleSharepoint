//TODO: add dark mode switch

const topDiv = document.getElementById("s4-bodyContainer");
var mainBody = document.createElement("div");
mainBody.className = "grid-container";
topDiv.appendChild(mainBody)

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

function save() {
    if (platform == "firefox") {
      browser.storage.sync.set({
        SimpleSharepointLinks: links
      });
    }
    else if (platform == "chrome") {
      chrome.storage.sync.set({
        "SimpleSharepointLinks": links
      });
    }
}

function requestLinks() {
    links = [
        {"order": 0, "used": true, "name": "Agenda", "link": "https://outlook.office365.com/owa/?realm=coornhert.onmicrosoft.com&exsvurl=1&ll-cc=1043&modurl=1", "image": "https://coornhert.sharepoint.com/pictos/agenda.png"},
        {"order": 1, "used": true, "name": "Keuzerooster", "link": "https://coornhert.sharepoint.com/kernkeuze", "image": "https://coornhert.sharepoint.com/Pictos/kernkeuze.PNG"},
        {"order": 2, "used": true, "name": "Learnbeat", "link": "https://inloggen.learnbeat.nl/users/login", "image": "https://i.postimg.cc/QdxbZPx3/lb.png"},
        {"order": 3, "used": true, "name": "Leerlingenraad", "link": "https://coornhert.sharepoint.com/Leerlingenraad/Forms/AllItems.aspx", "image": "https://coornhert.sharepoint.com/pictos/personen.png"},
        {"order": 4, "used": true, "name": "Liber", "link": "https://coornhert.sharepoint.com/sites/liber", "image": "https://coornhert.sharepoint.com/pictos/liber.png"},
        {"order": 5, "used": true, "name": "Mail", "link": "https://outlook.office365.com/owa/?realm=coornhert.onmicrosoft.com&exsvurl=1&ll-cc=1043&modurl=0", "image": "https://coornhert.sharepoint.com/pictos/email.png"},
        {"order": 6, "used": true, "name": "OneDrive Personal", "link": "https://coornhert-my.sharepoint.com/_layouts/15/MySite.aspx", "image": "https://coornhert.sharepoint.com/pictos/onedrive.png"},
        {"order": 7, "used": true, "name": "OneDrive School", "link": "https://coornhert-my.sharepoint.com/personal/documentbeheer_coornhert-gymnasium_nl/Documents/Coornhert", "image": "https://coornhert.sharepoint.com/pictos/onedrive.png"},
        {"order": 8, "used": true, "name": "Roosterpunt", "link": "https://saml.roosterpunt.nl/auth/azure_start.php", "image": "https://coornhert.sharepoint.com/pictos/roosterpunt.png"},
        {"order": 9, "used": true, "name": "SOM", "link": "https://somtoday.nl/azure?tenant=coornhert-gymnasium.nl", "image": "https://coornhert.sharepoint.com/Pictos/SOM2DAY.png"},
        {"order": 10, "used": true, "name": "WisWeb", "link": "https://app.dwo.nl/leerling/", "image": "http://www.michelhoekstra.net/wp-content/uploads/2016/01/Numworx-Favicon-300x300.png"},
        {"order": 11, "used": true, "name": "Zermelo", "link": "https://myapps.microsoft.com/signin/Zermelo/f999fd7a82784b578691fe3af2c9a17d", "image": "https://coornhert.sharepoint.com/pictos/zermelo.png"}
    ]
    save();
    return links;
  }

try {
    browser;
    platform = "firefox";
  }
  catch (error) {
    platform = "chrome";
  }

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

function addButtons (results) {
    links = results["SimpleSharepointLinks"];
    if (links == undefined) {
        links = requestLinks();
    }
    console.log(links);
    var x = 0;
    for (index in links) {if (links[index].used) {x++;} }
    var cols = Math.ceil(Math.sqrt(x));
    var rows = Math.ceil(x/cols);
    console.log(rows);

    sorted = links.sort(dynamicSort("order"));

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
        if (sorted[i].used) {
            var button = document.createElement("div");
            
            button.className = "grid-item";
            button.setAttribute("onclick", "window.open('" + sorted[i].link + "')");
            button.style.backgroundImage = "url('" + sorted[i].image + "')";
            button.style.backgroundSize = "cover";

            var text = document.createElement("div");
            text.className = "text";
            text.innerText = sorted[i].name;
            text.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            button.appendChild(text);

            mainBody.appendChild(button);
        }
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

if (platform == "firefox") {
    var used = browser.storage.sync.get("SimpleSharepointLinks");
    used.then(addButtons, requestLinks);
}
else if (platform == "chrome") {
    try { 
        var used = chrome.storage.sync.get(["SimpleSharepointLinks"], addButtons);
    }
    catch (error) {
        requestLinks();
        addButtons({SimpleSharepointLinks: links});
    }
}