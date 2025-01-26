document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn")
  const loginContainer = document.getElementById("loginContainer")
  const badgeContainer = document.getElementById("badgeContainer")
  const profilePic = document.getElementById("profilePic")
  const userName = document.getElementById("userName")
  const shareBtn = document.getElementById("shareBtn")

  // Handle login
  loginBtn.addEventListener("click", () => {
    IN.User.authorize(() => {
      IN.API.Profile("me")
        .fields(["id", "firstName", "lastName", "profilePicture"])
        .result((data) => {
          const profile = data.values[0]
          const pictureUrl =
            profile.profilePicture?.["displayImage~"]?.elements?.[0]?.identifiers?.[0]?.identifier ||
            "https://via.placeholder.com/150"

          profilePic.src = pictureUrl
          userName.textContent = `${profile.firstName} ${profile.lastName}`
          loginContainer.classList.add("hidden")
          badgeContainer.classList.remove("hidden")
        })
        .error((error) => {
          console.error("Error fetching profile:", error)
          alert("Failed to fetch profile. Please try again.")
        })
    })
  })

  // Handle share
  shareBtn.addEventListener("click", () => {
    const badge = document.getElementById("badge")

    shareBtn.disabled = true
    shareBtn.innerHTML = '<span class="animate-spin inline-block mr-2">↻</span> Preparing...'

    html2canvas(badge, {
      useCORS: true,
      backgroundColor: null,
    })
      .then((canvas) => {
        const imageData = canvas.toDataURL("image/png")

        shareBtn.innerHTML = '<span class="animate-spin inline-block mr-2">↻</span> Sharing...'

        IN.UI.Share()
          .params({
            url: "https://share.sef25.com",
            title: "I'm attending SEF25!",
            description:
              "Join me at the Sharjah Entrepreneurship Festival on February 1-2, 2025. Discover the latest technologies and hear from global speakers and startups.",
            image: imageData,
          })
          .place()
          .error((error) => {
            console.error("Share error:", error)
            shareBtn.disabled = false
            shareBtn.innerHTML = "Share Your Badge on LinkedIn"
            alert("Failed to share. Please try again.")
          })
      })
      .catch((error) => {
        console.error("Canvas error:", error)
        shareBtn.disabled = false
        shareBtn.innerHTML = "Share Your Badge on LinkedIn"
        alert("Failed to generate badge. Please try again.")
      })
  })
})

