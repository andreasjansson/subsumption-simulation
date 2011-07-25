Simulation = function(config)
{
  this.config = config;
  this.initialScale = config.gems[0].scale;
  this.agents = this.createAgents();
  this.time = 0;
}

Simulation.colourNames = ["red", "green", "purple", "blue", "cyan", 
                          "orange", "turquoise", "darkblue", "darkred",
                          "darkgreen", "gray"];

Simulation.prototype.createAgents = function()
{
  var config = this.config;
  var agents = [];
  for(var i = 0; i < config.agentCount; i ++) {
    var initialPitch = (config.maxPitch - config.minPitch) /
      (config.agentCount + 2) * (i + 1) + config.minPitch;
    agents.push(new Agent(config, initialPitch, i));
  }

  return agents;
}

Simulation.prototype.step = function()
{
  this.findAgentCollisions();
  for(var i = 0; i < this.config.agentCount; i ++) {
    this.agents[i].step();
  }

  this.time ++;

  if(this.time >= this.config.endTime)
    this.onComplete();
}

Simulation.prototype.findAgentCollisions = function()
{
  var agentCount = this.config.agentCount;
  for(var i = 0; i < agentCount; i ++)
    this.agents[i].collisions = [];

  for(var i = 0; i < agentCount - 1; i ++)
    for(var j = i + 1; j < agentCount; j ++) 
      if(this.agents[i].getScaledNote() ==
         this.agents[j].getScaledNote()) {
        this.agents[i].collisions.push(this.agents[j]);
        this.agents[j].collisions.push(this.agents[i]);
      }
}

Simulation.prototype.elements = function()
{
  var elements = this.agents;
  return elements;
}

Simulation.prototype.destroy = function()
{

}

// we have to add one to top and bottom since the actual pitch
// is scaled and the scaled pitch may end up outside the border.
Simulation.prototype.getBorders = function()
{
  var borders = [];
  borders = borders.concat(
    BorderElement.makeBorder(this.config.endTime + 1, this.config.minPitch - 1),
    BorderElement.makeBorder(this.config.endTime + 1, this.config.maxPitch + 1));

  return borders;
}