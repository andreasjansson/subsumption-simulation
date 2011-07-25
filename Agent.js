Agent = function(config, initialPitch, index)
{
  this.config = config;
  this.time = 0;
  this.pitch = initialPitch;
  this.index = index;
  this.bias = 0;
  this.scale = config.gems[0].scale;
  this.power = 1;
  this.collisions = [];

  this.text = "x";
  this.colourFrom = Agent.COLOUR_FROM_SCALE;
}

Agent.COLOUR_FROM_INDEX = 1;
Agent.COLOUR_FROM_SCALE = 2;

Agent.prototype.step = function()
{
  var scale = this.getNewScale();
  if(scale) {
    this.scale = scale;
    this.power = 1;
  }
  else
    this.power /= 2;

  this.bias = this.getNewBias();
  this.pitch = this.getNewPitch();
  this.time ++;
}

Agent.prototype.getScaledNote = function()
{
  var octave = Math.floor(this.pitch) / 12;
  var note = Math.floor(this.pitch) % 12;
  var scaledNote;
  var i = 0;

  while((scaledNote = this.scale.notes[i ++]) <= note &&
        i < this.scale.length)
    ;

  return scaledNote + octave * 12;
}

Agent.prototype.getNewScale = function()
{
  for(var i = 0; i < this.config.gems.length; i ++) {
    var gem = this.config.gems[i];
    if(Math.abs(gem.time - this.time) < gem.width &&
       Math.abs(gem.pitch - this.pitch) < gem.height)
      return gem.scale;
  }

  if(this.collisions.length == 0)
    return null;

  var newScale = this.scale;
  var newPower = this.power;
  for(var i = 0; i < this.collisions.length; i ++) {
    var otherAgent = this.collisions[i];
    if(newScale != otherAgent.scale &&
       otherAgent.power > newPower) {
      newScale = otherAgent.scale;
      newPower = otherAgent.power;
    }
  }

  if(newScale == this.scale)
    return null;

  return newScale;
}

Agent.prototype.getNewBias = function()
{
  if(this.pitch < this.config.minPitch)
    return 1;
  if(this.pitch > this.config.maxPitch)
    return -1;

  if(this.collisions.length == 0)
    return this.bias / 2;

  var bias = 0;
  for(var i = 0; i < this.collisions.length; i ++)
    bias += Math.sign(this.index - this.collisions[i].index);

  return Math.sign(bias);
}

Agent.prototype.getNewPitch = function()
{
  var maxJump = this.config.maxJump;
  var low = 0 - maxJump / 2 + (maxJump / 2) * this.bias;
  var high = maxJump / 2 + (maxJump / 2) * this.bias;
  var pitch = this.pitch + low + Math.random() * (high - low);

  return pitch;
}

Agent.prototype.getText = function()
{
  return this.text;
}

Agent.prototype.getColour = function()
{
  var colourIndex;
  switch(this.colourFrom) {
  case Agent.COLOUR_FROM_INDEX:
    colourIndex = this.index;
    break;
  case Agent.COLOUR_FROM_SCALE:
    colourIndex = this.scale.index;
    break;
  }

  return Simulation.colourNames[colourIndex];
}

Agent.prototype.getZIndex = function()
{
  return 40;
}

Agent.prototype.getPosition = function()
{
  return new Vector(this.time, this.getScaledNote());
}