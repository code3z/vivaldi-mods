/* ----------------------------------------------------------------
	Better Vertical Tabs
	JavaScript accompanying CSS
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Description:       Description [Project]
	Filename:          vertical_tabs/better-vertical-tabs.js
	Platform:          Linux, but can be adapted
	Version:           v1.1
	Date:              May 2021
	Author:            @code3 at vivaldi.net, @code3z at github.com
	Topic:             ---
	This is free and unencumbered software released into the public domain.
	https://unlicense.org/UNLICENSE

  Based on KeyBoad Machine by @lonm @lonmcgregor
	Some parts need adjusting depending on your setup or preferences.
   ----------------------------------------------------------------- */



(function betterVerticalTabsMod(){
    /**
    * Add custom commands here
    * key: String of what keys to press - written in the form (Ctrl+Shift+Alt+Key)
    * value: A function describing what to do when the key is pressed
    */
    const SHORTCUTS = {
        "Ctrl+Shift+F4": () => { /* load all the web panels */
            const webPanels = document.querySelectorAll("#switch button.webviewbtn");
            webPanels.forEach(button => {
                button.click();
            });
            webPanels[webPanels.length-1].click();
        },
        "Ctrl+Alt+G": () => { /* make page text yellow */
            document.querySelector("#tabs-tabbar-container").classList.remove("tabsreverse");
        },
        "Ctrl+Alt+F": () => {
            document.querySelector("#tabs-tabbar-container").classList.add("tabsreverse");
        },
        "Ctrl+T": () => {
            console.log("This normally opens a tab, but you can now do something else at the same time!");
        },
			};


    /* remember last active panel */
    let lastActivePanel;

    /**
     * Handle a potential keyboard shortcut
     * @param {String} combination written in the form (CTRL+SHIFT+ALT+KEY)
     * @param {boolean} extras I don't know what this does, but it's an extra argument
     */
    function keyCombo(combination, extras){
        const customShortcut = SHORTCUTS[combination];
        if(customShortcut){
            customShortcut();
        }
    }
    function vertical_tabs_floating(){
    document.querySelectorAll('#tabs-tabbar-container div').forEach(item => {
      item.addEventListener('mousedown', event => {
        document.querySelector("#tabs-tabbar-container ").classList.add("show-stack");
        console.log("added");

      });
    });

    document.addEventListener('mouseup', event => {
      document.querySelector("#tabs-tabbar-container").classList.remove("show-stack");
      console.log("removed");
    });
    const attrObserver = new MutationObserver((mutations) => {
      mutations.forEach(mu => {
        if (mu.type !== "attributes" && mu.attributeName !== "class") return;
        console.log("class was modified!");
        if (document.querySelector("#tabs-subcontainer").classList.contains("visible")) {
          document.querySelector("#tabs-tabbar-container").classList.add("has-substack");
          console.log("Success!");
        } else {
          document.querySelector("#tabs-tabbar-container").classList.remove("has-substack");
          console.log("removed");
        }
      });
    });

      const ELS_test = document.querySelectorAll("#tabs-subcontainer");
      ELS_test.forEach(el => attrObserver.observe(el, {attributes: true}));

    }
    /**
     * Check that the browser is loaded up properly, and init the mod
     */
function tooltipHandler() {
     if(document.querySelector("#vivaldi-tooltip")){
       document.querySelector('#vivaldi-tooltip').addEventListener('mouseover', event => {
           document.querySelector("#tabs-tabbar-container ").classList.add("show-stack");
           console.log("added");
       })
     } else {
         setTimeout(tooltipHandler, 500);
     }
}
    function initMod(){
        if(document.querySelector("#browser")){
            vivaldi.tabsPrivate.onKeyboardShortcut.addListener(keyCombo);
            vertical_tabs_floating();
            // History moon
            document.querySelector('[title="Take a Break"]').classList.add("warlock-clock");
        } else {
            setTimeout(initMod, 500);
        }
    }
    initMod();
})();
