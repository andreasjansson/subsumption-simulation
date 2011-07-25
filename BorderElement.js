BorderElement = function(x, y)
{
  this.position = new Vector(x, y);
}

BorderElement.prototype.getText = function()
{
  return "_";
}

BorderElement.prototype.getColour = function()
{
  return "Gray";
}

BorderElement.prototype.getZIndex = function()
{
  return 120;
}

BorderElement.prototype.getPosition = function()
{
  return this.position;
}

BorderElement.makeBorder = function(width, y)
{
  var borderElements = [];
  for(var x = 0; x < width; x ++) {
    borderElements.push(new BorderElement(x, y));
  }

  return borderElements;
}