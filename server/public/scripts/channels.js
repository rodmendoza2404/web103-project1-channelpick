const renderChannels = async () => {
  const response = await fetch('/channels')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  const pageTitle = document.createElement('h1')
  pageTitle.textContent = 'Best YouTube Channels'
  mainContent.appendChild(pageTitle)

  const intro = document.createElement('p')
  intro.textContent = 'Discover some of the best YouTube channels for learning, tech, productivity, and inspiration.'
  mainContent.appendChild(intro)

  const grid = document.createElement('div')
  grid.className = 'card-grid'

  if (data && data.length > 0) {
    data.forEach(channel => {
      const card = document.createElement('article')
      card.className = 'card'

      const image = document.createElement('img')
      image.src = channel.image
      image.alt = channel.name

      const name = document.createElement('h3')
      name.textContent = channel.name

      const category = document.createElement('p')
      category.innerHTML = `<strong>Category:</strong> ${channel.category}`

      const description = document.createElement('p')
      description.textContent = channel.description

      const link = document.createElement('a')
      link.href = `/channels/${channel.slug}`
      link.textContent = 'Read More'
      link.setAttribute('role', 'button')

      card.appendChild(image)
      card.appendChild(name)
      card.appendChild(category)
      card.appendChild(description)
      card.appendChild(link)

      grid.appendChild(card)
    })

    mainContent.appendChild(grid)
  } else {
    const message = document.createElement('h2')
    message.textContent = 'No channels available.'
    mainContent.appendChild(message)
  }
}

renderChannels()