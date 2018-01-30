//------------------------------------------------------
// SOLDIER
//------------------------------------------------------

// TEST REQUIREMENTS

// - The Soldier constructor function should take two arguments: health + strength


function Soldier(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
}

Soldier.prototype.attack = function () {
  return this.strength;
};

Soldier.prototype.receiveDamage = function (damage) {
  this.health -= damage;
};


//------------------------------------------------------
// VIKING
//------------------------------------------------------
function Viking(nameArg, healthArg, strengthArg) {
  
  // Viking inherits from Soldier
  Soldier.call(this, healthArg, strengthArg);
  this.name = nameArg;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
  
  // Remove received damage from health property
  this.health -= damage;

  if (this.health > 0) {
    return this.name + ' has received ' + damage + ' points of damage';
  }
  return this.name + ' has died in act of combat';
};

Viking.prototype.battleCry = function () {
  return 'Odin Owns You All!';
};


//------------------------------------------------------
// SAXON
//------------------------------------------------------
function Saxon(healthArg, strengthArg) {
  
  // Saxon inherits from Soldier
  Soldier.call(this, healthArg, strengthArg);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
  
  // Remove received damage from health property
  this.health -= damage;

  if (this.health > 0) {
    return 'A Saxon has received ' + damage + ' points of damage';
  }
  return 'A Saxon has died in combat';
};


//------------------------------------------------------
// WAR
//------------------------------------------------------

function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function (viking) {
  this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function (saxon) {
  this.saxonArmy.push(saxon);
};

War.prototype.saxonAttack = function () {

  // Pull random index number based on vikingArmy array length
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);

  // Pull random index number based on saxonArmy array length
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);

  // Use random index to select random Viking soldier
  var theViking = this.vikingArmy[vikingIndex];

  // Use random index to select random Saxon soldier
  var theSaxon = this.saxonArmy[saxonIndex];

  // Apply damage to selected Viking based on Saxon attack
  var result = theViking.receiveDamage(theSaxon.attack());

  // If the health of the respective Saxon is less than or equal to zero,
  // it will be removed from the saxonArm array
  if (theViking.health <= 0) {

    // Delete count set to 1 from point of Saxon in army, removing it.
    this.vikingArmy.splice(vikingIndex, 1);
  }

  // Return message outputting damage done to Saxon
  return result;
};

War.prototype.vikingAttack = function () {
  
  // Pull random index number based on vikingArmy array length
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  
  // Pull random index number based on saxonArmy array length
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  
  // Use random index to select random Viking soldier
  var theViking = this.vikingArmy[vikingIndex];
  
  // Use random index to select random Saxon soldier
  var theSaxon = this.saxonArmy[saxonIndex];

  // Apply damage to selected Saxon based on Viking attack
  var result = theSaxon.receiveDamage(theViking.attack());

  // If the health of the respective Saxon is less than or equal to zero,
  // it will be removed from the saxonArm array
  if (theSaxon.health <= 0) {
    
    // Delete count set to 1 from point of Saxon in army, removing it.
    this.saxonArmy.splice(saxonIndex, 1);
  }

  // Return message outputting damage done to Saxon
  return result;
};

War.prototype.showStatus = function () {
  if (this.saxonArmy.length === 0) {
    return 'Vikings have won the war of the century!';
  } else if (this.vikingArmy.length === 0) {
    return 'Saxons have fought for their lives and survive another day...';
  }
  return 'Vikings and Saxons are still in the thick of battle.';
};
