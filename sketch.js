var balloonPosition,database,balloonImage,backgroundImg,background;
var position;

function preload()
{
   balloonImage = loadImage("pro-C35 images/Hot Air Ballon-02.png");
   backgroundImg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
}



function setup()
{
    database = firebase.database();
    console.log(database);

    createCanvas(1000,1000);
    
    background = createSprite(500,500,1500,1500);
    background.addImage("CityBackground",backgroundImg);
    background.scale = 1


    balloonPosition = createSprite(250,250,10,10);
    balloonPosition.shapeColor = "red";
    balloonPosition.addAnimation("HotAirBalloon",balloonImage);
    var balloonPosition = database.ref('balloon/height')
    balloonPosition.on("value",readHeight,showError);

   
}

function draw()
{
    //background ("pro-C35 images/Hot Air Ballon-01.png");

    if(keyDown(LEFT_ARROW)){
        updateHeight(-10,0);
      }
      else if(keyDown(RIGHT_ARROW)){
        updateHeight(+10,0);
      }
      else if(keyDown(UP_ARROW)){
        updateHeight(0,-10);
      }
      else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+10);
      }
      drawSprites();

}

function updateHeight(x,y)
{
    database.ref('balloon/height').set({
        'x': height.x + x ,
        'y': height.y + y
    })
}

function readHeight(data){
    height = data.val();
    console.log(height.x);
    balloon.x = height.x;
    balloon.y = height.y;
  }

function showError()
{
    console.log("error in writing to database");
}