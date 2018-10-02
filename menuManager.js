class MenuManager {
    constructor() {
        var i,
            menuLinks = document.getElementsByClassName("menuLink");

        for (i = 0; i < menuLinks.length; i++) {
            menuLinks[i].onclick = this.openMenu.bind(this);
        }
    }
    openMenu(evt) {
        var i, menuContents, menuLinks;
        menuContents = document.getElementsByClassName("menuContent");
        for (i = 0; i < menuContents.length; i++) {
            menuContents[i].style.display = "none";
        }
        menuLinks = document.getElementsByClassName("menuLink");
        for (i = 0; i < menuLinks.length; i++) {
            menuLinks[i].className = menuLinks[i].className.replace(" active", "");
        }
        document.getElementById(evt.currentTarget.name).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

var m = new MenuManager();