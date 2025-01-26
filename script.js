document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn")
  const loginContainer = document.getElementById("loginContainer")
  const badgeContainer = document.getElementById("badgeContainer")
  const profilePic = document.getElementById("profilePic")
  const userName = document.getElementById("userName")
  const shareBtn = document.getElementById("shareBtn")

  loginBtn.addEventListener("click", () => {
    IN.User.authorize(() => {
      IN.API.Profile("me")
        .fields("id", "firstName", "lastName", "pictureUrl")
        .result((data) => {
          const profile = data.values[0]
          profilePic.src = profile.pictureUrl || "https://via.placeholder.com/150"
          userName.textContent = `${profile.firstName} ${profile.lastName}`
          loginContainer.classList.add("hidden")
          badgeContainer.classList.remove("hidden")
        })
    })
  })

  shareBtn.addEventListener("click", () => {
    const badge = document.getElementById("badge")
    html2canvas(badge).then((canvas) => {
      const imageData = canvas.toDataURL("image/png")
      IN.UI.Share()
        .params({
          url: "https://share.sef25.com",
          title: "I'm attending SEF25!",
          description: "Join me at the Sharjah Entrepreneurship Festival on February 1-2, 2025.",
          image: imageData,
        })
        .place()
    })
  })
})

