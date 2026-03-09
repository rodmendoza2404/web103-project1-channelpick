const header = document.querySelector('header')

const nav = document.createElement('nav')

const leftSide = document.createElement('ul')
const leftItem = document.createElement('li')
const title = document.createElement('strong')
title.textContent = 'ChannelPick'
leftItem.appendChild(title)
leftSide.appendChild(leftItem)

const rightSide = document.createElement('ul')
const rightItem = document.createElement('li')
const homeLink = document.createElement('a')
homeLink.href = '/'
homeLink.textContent = 'Home'
rightItem.appendChild(homeLink)
rightSide.appendChild(rightItem)

nav.appendChild(leftSide)
nav.appendChild(rightSide)
header.appendChild(nav)