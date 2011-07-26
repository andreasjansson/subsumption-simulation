BiasDisplay = function(agent, $parent)
{
  this.agent = agent;
  this.$node = $("<div id='biasDisplay'></div>");
  $parent.append(this.$node);
}

BiasDisplay.prototype.draw = function()
{
  this.$node.text('Bias: ' + this.getBias());
}

BiasDisplay.prototype.getBias = function()
{
  // upside down
  return -Math.floor(this.agent.bias * 1000) / 1000;
}
