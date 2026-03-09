const renderChannel = async () => {
  const slug = window.location.pathname.split('/').pop()

  const response = await fetch('/channels')
  const data = await response.json()

  const channel = data.find(item => item.slug === slug)
  const channelContent = document.getElementById('channel-content')

  if (!channel) {
    channelContent.innerHTML = `
      <article>
        <h2>No channel found.</h2>
        <a href="/" role="button">Back Home</a>
      </article>
    `
    return
  }

  document.getElementById('image').src = channel.image
  document.getElementById('image').alt = channel.name
  document.getElementById('name').textContent = channel.name
  document.getElementById('category').textContent = `Category: ${channel.category}`
  document.getElementById('description').textContent = `Description: ${channel.description}`
  document.getElementById('whyWatch').textContent = `Why watch: ${channel.whyWatch}`
  document.getElementById('submittedBy').textContent = `Submitted by: ${channel.submittedBy}`
  document.getElementById('channelLink').href = channel.channelLink
  document.title = `ChannelPick - ${channel.name}`
}

renderChannel()