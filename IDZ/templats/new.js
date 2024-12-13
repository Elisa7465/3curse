document.addEventListener("DOMContentLoaded", () => {
    const seasonButtons = document.querySelectorAll(".season-button");
    const seasonEpisodes = document.querySelectorAll(".season-episodes");
    const playerContainer = document.getElementById("player-container");
    const player = document.getElementById("player");
  
    // Обработка переключения сезонов
    seasonButtons.forEach(button => {
      button.addEventListener("click", () => {
        const selectedSeason = button.getAttribute("data-season");
  
        seasonEpisodes.forEach(season => {
          if (season.id === `season-${selectedSeason}`) {
            season.classList.add("active");
          } else {
            season.classList.remove("active");
          }
        });
      });
    });
  
    // Обработка выбора серии
    document.querySelectorAll(".episode").forEach(episode => {
      episode.addEventListener("click", () => {
        const iframe = episode.getAttribute("data-iframe");
        player.innerHTML = iframe;
        playerContainer.style.display = "block";
      });
    });
  });
  