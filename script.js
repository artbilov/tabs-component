const tabsData = [{ title: 'Alpha', content: 'text' }, { title: 'Beta', content: 'text2' }, { title: 'Gamma', content: 'text3' }, { title: 'Delta', content: 'text4' }, { title: 'Omega', content: 'text5' }, { title: 'Sigma', content: 'text6' }, { title: 'Teta', content: 'text7' }, { title: 'Phi', content: 'text8' }]
const tabsContainer = makeTabs(tabsData)

document.body.append(tabsContainer)

function makeTabs(tabsData) {
  const tabsContainer = document.createElement('div')
  const rnd = Math.floor(Math.random() * 360)
  const step = 360 / tabsData.length

  tabsContainer.innerHTML = `
    <div class="nav">${tabsData.map(({ title }, i) => `<button class="tab" style="background: hsl(${i * step + rnd}, 80%, 75%)">${title}</button>`).join('')
    }</div>

    <div class="tab-content">${tabsData.map(({ content }, i) => `<div hidden style="background: hsl(${i * step + rnd}, 80%, 75%)">
      <p>${content}</p>
    </div>`).join('')
    }</div>
  `
  tabsContainer.innerHTML = `
    <div class="nav">${tabsData.map(({ title }, i) => `<button class="tab">${title}</button>`).join('')
    }</div>

    <div class="tab-content">${tabsData.map(({ content }, i) => `<div hidden>
      <p>${content}</p>
    </div>`).join('')
    }</div>
  `
  for (let i = 1; i <= tabsData.length; i++) {
    tabsContainer.style.setProperty(`--color${i}`, `hsl(${i * step + rnd}, 75%, 80%)`)

  }

  tabsContainer.querySelector('.tab').classList.add('active')
  tabsContainer.querySelector('[hidden]').hidden = false

  const [nav] = tabsContainer.getElementsByClassName('nav')
  const [tabContent] = tabsContainer.getElementsByClassName('tab-content')

  nav.addEventListener('click', chooseTab)

  function chooseTab(e) {
    if (e.target === nav) return
    
    const tab = e.target
    const i = [...nav.children].indexOf(tab)

    nav.querySelector('.active').classList.remove('active')
    tab.classList.add('active')

    tabContent.querySelector('div:not([hidden])').hidden = true
    tabContent.children[i].hidden = false;
  }

  return tabsContainer
}