Gem = function(scale, time, pitch, width, height)
{
  this.scale = scale;
  this.time = time;
  this.pitch = pitch;
  this.width = width;
  this.height = height;

  this.text = "<b style='font-size: " +
    (13 + 2 * Math.floor(Math.sqrt(this.width * this.height))) + "px'>G</b>";
}

Gem.prototype.getColour = function()
{
  return Simulation.colourNames[this.scale.index];
}

Gem.prototype.getZIndex = function()
{
  return 80;
}

Gem.prototype.getText = function()
{
  return this.text;
}

Gem.prototype.getPosition = function()
{
  return new Vector(this.time, this.pitch);
}
