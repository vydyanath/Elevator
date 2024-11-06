let currentFloor = null;
let selectedFloors = [];

function setInitialFloor() {
  const initialFloor = parseInt(document.getElementById("initial-floor").value);
  if (initialFloor >= 1 && initialFloor <= 9) {
    currentFloor = initialFloor;
    document.getElementById("current-floor").innerText = `Current Floor: ${currentFloor}`;
    document.getElementById("elevator").innerText = currentFloor;
    document.getElementById("elevator").style.transform = `translateY(${getElevatorPosition(currentFloor)}px)`;
    document.getElementById("floor-buttons").style.pointerEvents = "auto";
    document.getElementById("simulate").disabled = false;
  } else {
    alert("Please enter a valid floor between 1 and 9.");
  }
}

function selectFloor(floor) {
  if (!selectedFloors.includes(floor) && floor !== currentFloor) {
    selectedFloors.push(floor);
    document.getElementById("selected-floors").innerText = `Selected Floors: ${selectedFloors.join(", ")}`;
  }
}

function simulateElevator() {
  let simulationFloors = [...selectedFloors];
  if (simulationFloors.length === 0) {
    alert("Please select at least one floor before simulation.");
    return;
  }
  simulateMovement(simulationFloors);
}

function simulateMovement(simulationFloors) {
  if (simulationFloors.length > 0) {
    simulationFloors.sort((a, b) => Math.abs(a - currentFloor) - Math.abs(b - currentFloor));
    let nextFloor = simulationFloors.shift();
    moveToFloor(nextFloor);
    setTimeout(() => {
      currentFloor = nextFloor;
      document.getElementById("current-floor").innerText = `Current Floor: ${currentFloor}`;
      document.getElementById("elevator").innerText = currentFloor;
      simulateMovement(simulationFloors);
    }, 1000);
  } else {
    selectedFloors = [];
    document.getElementById("selected-floors").innerText = "Selected Floors: ";
  }
}

function moveToFloor(floor) {
  const elevator = document.getElementById("elevator");
  const position = getElevatorPosition(floor);
  elevator.style.transform = `translateY(${position}px)`;
}

function getElevatorPosition(floor) {
  return (9 - floor) * 30;
}
