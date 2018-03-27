/* patatap_paper.js */
var circles = [];

function onKeyDown(e){      
  if(keyData[e.key]){
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = new Path.Circle(point, 500);
    newCircle.fillColor = keyData[e.key].color;
    keyData[e.key].sound.play();
    circles.push(newCircle);
  }
}      
      
function onFrame(event){
  for(var i = 0; i < circles.length; i++){
    circles[i].fillColor.hue += 1;
    circles[i].scale(0.9);
          
    if(circles[i].area < 1){
      circles[i].remove(); // remove the circle from the canvas
      circles.splice(i, 1); // remove the circle from the array
      i--; // decrement i so that the loop doesn't skip a circle because of .splice()
    }
  }
}      