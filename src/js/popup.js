import ext from './util/ext'
import '../css/popup.css'
import hello from './popup/example'

const initEvents = () => {
  const settingMenu = document.querySelector('.setting-menu');
  settingMenu.addEventListener("click", function(e) {
    e.preventDefault();
    ext.tabs.create({'url': ext.extension.getURL('options.html')});
  })
}

initEvents()
