const list = document.querySelector("#starred");

function showError(message) {
  list.textContent = "";
  const item = document.createElement("li");
  item.setAttribute("role", "alert");
  item.textContent = message;
  list.appendChild(item);
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events: HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("Invalid events data: expected an array");
    }

    events.forEach((event) => {
      if (
        !event ||
        typeof event.name !== "string" ||
        typeof event.starred !== "string"
      ) {
        return; // Skip malformed entries
      }

      const item = document.createElement("li");

      const link = document.createElement("a");
      link.href = `https://github.com/${event.name}`;
      link.textContent = event.name;

      const date = document.createElement("time");
      date.dateTime = event.starred;
      date.textContent = event.starred;

      item.append(link, " - starred ", date);
      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.error(error);
    showError("Could not load your starred repositories. Please try again later.");
  });
