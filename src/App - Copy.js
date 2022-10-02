import "./App.css";
import { Stage, Layer, Star } from "react-konva";
import { useEffect, useRef, useState, createRef } from "react";

function App() {
  const [starList, setStarList] = useState([]);
  const [starListRef, setStarListRef] = useState([]);
  const [currentActiveRefs, setcurrentActiveRef] = useState([]);
  const [randomRefCount, setRandomRefCount] = useState(0);
  const [scale, setScale] = useState(0.1);
  const canvasRef = useRef();

  class StarObject {
    constructor(x, y, numPoints, innerRadius, outerRadius, rotation) {
      this.x = x;
      this.y = y;
      this.numPoints = numPoints;
      this.innerRadius = innerRadius;
      this.outerRadius = outerRadius;
      this.rotation = rotation;
    }
  }

  const generateShapes = () => {
    let starMap = [];
    for (let i = 0; i < 1000; i++) {
      let x = Math.random() * 1500;
      let y = Math.random() * 1500;
      let numPoints = Math.floor(Math.random() * (10 - 5) + 5);
      let innerRadius = Math.floor(Math.random() * (6 - 3) + 3);
      let outerRadius = Math.floor(Math.random() * (10 - 7) + 7);
      let rotation = Math.random() * 180;
      let star = new StarObject(
        x,
        y,
        numPoints,
        innerRadius,
        outerRadius,
        rotation
      );
      starMap.push(star);
    }
    return starMap;
  };

  useEffect(() => {
    let stars = generateShapes();
    setStarList([...stars]);
    if (currentActiveRefs.length === 0) {
      getRandomRefs();
    }
  }, []);

  useEffect(() => {
    setStarListRef((starRefs) =>
      Array(starList.length)
        .fill()
        .map((_, i) => starRefs[i] || createRef())
    );
  }, [starList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      for (let i = 0; i < currentActiveRefs.length; i++) {
        let star = starListRef[currentActiveRefs[i]];
        star.current.to({
          scaleX: scale * 1.5,
          scaleY: scale * 1.5,
          duration: 0.5,
          onFinish: () => {
            star.current.to({
              scaleX: scale,
              scaleY: scale,
              duration: 0.5,
            });
          },
        });
      }
    }, 2500);

    return () => {
      clearInterval(intervalId);
    };
  }, [starListRef, currentActiveRefs]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      for (let i = 0; i < starListRef.length; i++) {
        let star = starListRef[i];
        star.current.to({
          x: star.current.attrs.x - 5,
          y: star.current.attrs.y - 5,
        });
      }
    }, 5000);

    let newArray = [...starList];
    const intervalIdTwo = setInterval(() => {
      for (let i = 0; i < newArray.length; i++) {
        let star = newArray[i];
        if (star.x < 0 || star.y < 0) {
          star.x = Math.floor(Math.random() * (2000 - 1500) + 1500);
          star.y = Math.floor(Math.random() * (2000 - 1500) + 1500);
        } else {
          star.x = star.x - 5;
          star.y = star.y - 5;
        }
      }

      setStarList(newArray);
    }, 5100);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdTwo);
    };
  }, [starListRef]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRandomRefs();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const getRandomRefs = () => {
    let arr = [];
    while (arr.length < 50) {
      let randomNumber = Math.floor(Math.random() * 1000);
      if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      }
    }
    console.log(arr);
    setcurrentActiveRef([...arr]);
  };

  const zoom = () => {
    for (let i = 0; i < starListRef.length; i++) {
      let star = starListRef[i];
      star.current.to({
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 1,
      });
    }
    setScale(0.5)
  };

  return (
    <div className="App" ref={canvasRef}>
      <Stage
        width={canvasRef.current?.clientWidth}
        height={canvasRef.current?.clientHeight}
      >
        {starList.length > 0 && starListRef.length > 0 && (
          <Layer>
            {starList.length > 0 &&
              starListRef.length > 0 &&
              starList.map((star, index) => (
                <Star
                  key={index}
                  x={star.x}
                  y={star.y}
                  numPoints={star.numPoints}
                  innerRadius={star.innerRadius}
                  outerRadius={star.outerRadius}
                  fill="#fff"
                  //opacity={0.5}
                  rotation={star.rotation}
                  shadowColor="#fff"
                  shadowBlur={5}
                  scaleX={scale}
                  scaleY={scale}
                  ref={(el) => (starListRef[index].current = el)}
                />
              ))}
          </Layer>
        )}
      </Stage>
      <button onClick={zoom}>Zoom</button>
    </div>
  );
}

export default App;
