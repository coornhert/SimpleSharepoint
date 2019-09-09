//TODO: add settings
//TODO: add dark mode switch

const links = [
    {"name": "Mail", "link": "https://outlook.office365.com/owa/?realm=coornhert.onmicrosoft.com&exsvurl=1&ll-cc=1043&modurl=0", "image": "https://coornhert.sharepoint.com/pictos/email.png"},
    {"name": "SOM", "link": "https://somtoday.nl/azure?tenant=coornhert-gymnasium.nl", "image": "https://coornhert.sharepoint.com/Pictos/SOM2DAY.png"},
    {"name": "Roosterpunt", "link": "https://saml.roosterpunt.nl/auth/azure_start.php", "image": "https://coornhert.sharepoint.com/pictos/roosterpunt.png"},
    {"name": "Zermelo", "link": "https://myapps.microsoft.com/signin/Zermelo/f999fd7a82784b578691fe3af2c9a17d", "image": "https://coornhert.sharepoint.com/pictos/zermelo.png"},
    {"name": "Liber", "link": "https://coornhert.sharepoint.com/sites/liber", "image": "https://coornhert.sharepoint.com/pictos/liber.png"},
    {"name": "Keuzerooster", "link": "https://coornhert.sharepoint.com/kernkeuze", "image": "https://coornhert.sharepoint.com/Pictos/kernkeuze.PNG"},
    {"name": "Learnbeat", "link": "https://inloggen.learnbeat.nl/users/login", "image": "https://i.postimg.cc/QdxbZPx3/lb.png"},
    {"name": "WisWeb", "link": "https://app.dwo.nl/leerling/", "image": "http://www.michelhoekstra.net/wp-content/uploads/2016/01/Numworx-Favicon-300x300.png"},
    {"name": "OneDrive School", "link": "https://coornhert-my.sharepoint.com/personal/documentbeheer_coornhert-gymnasium_nl/Documents/Coornhert", "image": "https://coornhert.sharepoint.com/pictos/onedrive.png"}
]

const topDiv = document.getElementById("s4-bodyContainer");
var mainBody = document.createElement("div");
mainBody.className = "grid-container";
topDiv.appendChild(mainBody)

var gridStyle = document.createElement("style");
gridStyle.type = "text/css";
gridStyle.innerHTML = ".grid-container { \
        grid-template-columns: auto auto auto; \
        display: grid; \
        grid-gap: 10px;} \
    .grid-item { \
        background-color: #3b3c48 !important; \
        height: 25.8vh !important; \
        width: 25vh !important; \
        border-radius: 30px !important; \
        cursor: pointer; } \
    #s4-bodyContainer { \
        height: 30vw; \
        width: 75vh !important; \
        padding-left: 30vw; \
        padding-top: 10vh; } \
    #s4-workspace { overflow: hidden; } \
    body { background-color: #14151f; }\
    .text { \
        color: white; \
        font-size: 1.7em;\
        width: 100%; \
        height: 40%; \
        line-height: 250%; \
        text-align: center; \
        margin-top: 62%; \
        border-radius: 0 0 30px 30px; \
        display: table; } \
    .ms-tableCell, .ms-table { display: none; }";

document.getElementsByTagName('head')[0].appendChild(gridStyle);


function addButton () {
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
addButton()
