class Map {
  constructor(mapSize) {
    this.size = mapSize;
  }

  init = () =>{
    this.createArea(this.size);
  }

  createArea (size) {
    console.log("Create a map with " + size * size + " cases");
    const area = [];
    for (let i = 0; i < size; i++){
      area.push([]);
      for (let j = 0; j < size; j++){
        area[i].push({
          isAccessible : true,
          coordinates : {
            x : i + 1, 
            y : j + 1
          },
          entityOnTheCase : null
        });
      }
    }
    this.displayArea(area);
  }

  displayArea (area) {
    console.log(area);
    const map = document.querySelector(".map");

    area.forEach(element => {
      const newDiv = document.createElement("div");
      map.appendChild(newDiv);
    });

    const divs = document.querySelectorAll(".map>div");
    console.log(divs);
    divs.forEach(element => {
      for (let i = 0; i < divs.length ;i++) {
        const newDiv = document.createElement("div");
        element.appendChild(newDiv);
      }
    });
  }
}

export default Map;