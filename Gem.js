Gem = function(scale, time, pitch, width, height)
{
  this.scale = scale;
  this.time = time;
  this.pitch = pitch;
  this.width = width;
  this.height = height;

  this.text = "G";
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
