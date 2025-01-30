// Sample Data provided in Resources
const dateArray = [
  "24-Apr-2024",
  "02-May-2024",
  "09-May-2024",
  "31-May-2024",
  "21-Jun-2024",
];
const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Bull Call Spread",
      ],
      "02-May-2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09-May-2024": [
        "Strategy Put",
        "Strategy Call",
        "Strategy Call",
        "Strategy Call",
        "Strategy Put",
      ],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": [
        "Bear Call Spread",
        "Bear Call Spread",
        "Bear Call Spread",
        "Long Put",
        "Long Put",
        "Long Put",
        "Bear Call Spread",
      ],
      "31-May-2024": [
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
      ],
      "21-Jun-2024": [
        "Strategy3",
        "Strategy3",
        "Bear Put Spread",
        "Strategy3",
        "Long Put",
        "Long Put",
      ],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02-May-2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21-Jun-2024": [
        "Iron Condor",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Condor",
      ],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy1",
        "Strategy1",
        "Spread-Strategy",
        "Long Straddle",
      ],
      "09-May-2024": [
        "Long Straddle",
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Long Straddle",
      ],
      "31-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
      ],
    },
  },
];

// DOM 
const selectedDateElement = document.getElementById("selected-date");
const dateCardsContainer = document.getElementById("date-cards");
const strategyCardsContainer = document.getElementById("strategy-cards");
const emptyState = document.getElementById("empty-state");
const viewRadios = document.querySelectorAll('input[name="view"]');

// Initialize selected date
let selectedDate = dateArray[0];

// Render Date Cards
function renderDateCards() {
  dateCardsContainer.innerHTML = ""; // Clear previous cards
  dateArray.forEach((date) => {
    const dateCard = document.createElement("div");
    dateCard.className = "date-card";
    dateCard.textContent = date;
    dateCard.addEventListener("click", () => handleDateClick(date));
    dateCardsContainer.appendChild(dateCard);
  });
}

// Handle Date Click
function handleDateClick(date) {
  selectedDate = date;
  selectedDateElement.textContent = date; // Update selected date display
  selectedDateElement.classList.remove("expanded"); // Collapse the date cards
  dateCardsContainer.classList.add("hidden"); // Hide date cards
  renderStrategyCards(selectedDate, getSelectedView());
}

// Toggle Date Cards Visibility
function toggleDateCards() {
  selectedDateElement.classList.toggle("expanded");
  dateCardsContainer.classList.toggle("hidden");
}

// Get Selected View
function getSelectedView() {
  return document.querySelector('input[name="view"]:checked').nextElementSibling
    .textContent;
}

// Render Strategy Cards
function renderStrategyCards(selectedDate, selectedView) {
  // Find the selected view's data
  const selectedViewData = strategyArray.find(
    (item) => item.View === selectedView
  );
  const strategiesForDate = selectedViewData?.Value[selectedDate] || [];

  // Count occurrences of each strategy
  const strategyCounts = {};
  strategiesForDate.forEach((strategy) => {
    strategyCounts[strategy] = (strategyCounts[strategy] || 0) + 1;
  });

  // Clear previous cards
  strategyCardsContainer.innerHTML = "";

  // Render new cards
  if (Object.keys(strategyCounts).length > 0) {
    emptyState.classList.add("hidden");
    Object.entries(strategyCounts).forEach(([name, count]) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${name}</h3>
        <p class="strategy-count">• ${count} ${
        count === 1 ? "Strategy" : "Strategies"
      }</p>
      `;
      strategyCardsContainer.appendChild(card);
    });
  } else {
    emptyState.innerHTML = `
      There are no strategies for <br>
      <span class="date">${selectedDate}</span>
    `;
    emptyState.classList.remove("hidden");
  }
}

// Event Listeners
function handleViewChange() {
  renderStrategyCards(selectedDate, getSelectedView());
}



selectedDateElement.textContent = selectedDate; // Set default selected date
selectedDateElement.addEventListener("click", toggleDateCards); // Toggle date cards on click
renderDateCards(); // Render date cards
document.getElementById("bullish").checked = true; // Set default view
renderStrategyCards(selectedDate, "Bullish"); // Initial render

// Add Event Listeners
viewRadios.forEach((radio) =>
  radio.addEventListener("change", handleViewChange)
);
