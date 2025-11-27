let statsData = [];

async function loadData() {
  try {
    const response = await fetch("/data.json");
    const jsons = await response.json();
    statsData = jsons;
    renderStats(statsData, "weekly"); // default view
  } catch (err) {
    console.error("Error fetching JSON:", err);
  }
}

function renderStats(data, timeframe) {
  const container = document.querySelector(".stats");
  container.innerHTML = "";

  data.forEach((item) => {
    // Card wrapper
    const card = document.createElement("div");
    const cardTitle = item.title.toLowerCase().replace(/\s+/g, "-");
    card.classList.add("stats__card", `stats__card--${cardTitle}`);

    // Background
    const backgroundEl = document.createElement("div");
    backgroundEl.classList.add("stats__card-background");

    // Content
    const content = document.createElement("div");
    content.classList.add("stats__card-content");

    // Category row
    const cardCategory = document.createElement("div");
    cardCategory.classList.add("stats__card-category");

    const statName = document.createElement("p");
    statName.classList.add("stats__name");
    statName.textContent = item.title;

    const btnElipsis = document.createElement("button");
    const btnImage = document.createElement("img");
    btnImage.src = "./images/icon-ellipsis.svg";
    btnElipsis.appendChild(btnImage);

    cardCategory.appendChild(statName);
    cardCategory.appendChild(btnElipsis);

    // Numbers
    const statNumbers = document.createElement("div");
    statNumbers.classList.add("stats__numbers");

    const hrs = document.createElement("p");
    hrs.classList.add("stats__numbers-hrs");
    hrs.textContent = `${item.timeframes[timeframe].current}hrs`;

    const time = document.createElement("p");
    time.classList.add("stats__numbers-time");

    // Label changes depending on timeframe
    let label = "";
    if (timeframe === "daily") label = "Yesterday";
    if (timeframe === "weekly") label = "Last Week";
    if (timeframe === "monthly") label = "Last Month";

    time.textContent = `${label} - ${item.timeframes[timeframe].previous}hrs`;

    statNumbers.appendChild(hrs);
    statNumbers.appendChild(time);

    // Assemble content
    content.appendChild(cardCategory);
    content.appendChild(statNumbers);

    // Assemble card
    card.appendChild(backgroundEl);
    card.appendChild(content);

    container.appendChild(card);
  });
}

loadData();

document.getElementById("btnDaily").addEventListener("click", () => {
  renderStats(statsData, "daily");
});

document.getElementById("btnWeekly").addEventListener("click", () => {
  renderStats(statsData, "weekly");
});

document.getElementById("btnMonthly").addEventListener("click", () => {
  renderStats(statsData, "monthly");
});
