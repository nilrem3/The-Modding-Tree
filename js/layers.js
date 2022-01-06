addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0)
    }},
    color: "#363636",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        mult = mult.times(effectOfUpgrade('p', 21))
        mult = mult.times(effectOfUpgrade('p', 22))

        mult = mult.times(effectOfUpgrade('p2', 12))
        mult = mult.times(effectOfUpgrade('p2', 13))

        mult = mult.times(effectOfUpgrade('p', 32))

        mult = mult.times(buyableEffect('pancake', 12))

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Basic Multiplier",
            description: "Multiply point gain by 2",
            cost: new Decimal(1),
            effect(){
                var e = new Decimal(2);

                e = e.pow(effectOfUpgrade('b', 11))

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        12: {
            title: "Stronger Multiplier",
            description: "Multiply Point gain by 5",
            cost: new Decimal(2),
            effect(){
                var e = new Decimal(5);

                e = e.pow(effectOfUpgrade('b', 12))

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        13: {
            title: "Log Multiplier",
            description: "Multiply Point gain by log10(Total prestige points)",
            cost: new Decimal(5),
            effect(){
                var base = 10;
                if(hasUpgrade('b', 14)) base = 2
                var e = Decimal.log(player[this.layer].total.add(1), base).add(1);

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        14: {
            title: "New Layer",
            description: "Unlocks a new layer",
            cost: new Decimal(30)
        },
        15: {
            title: "Another Multiplier",
            description: "Multiply Point gain by 3",
            cost: new Decimal(50),
            effect(){
                var e = new Decimal(3);

                e = e.pow(effectOfUpgrade('b', 11))

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        21: {
            title: "More Prestige Points",
            description: "Prestige Point Gain multiplied by 1.5",
            cost: new Decimal(100),
            effect(){
                var e = new Decimal(1.5);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasMilestone('m', 0)
            }
        },
        22: {
            title: "Multiplied Prestige Points",
            description: "Prestige Point Gain multiplied by 1.1 for each Multiplication Point",
            cost: new Decimal(250),
            effect(){
                var e = new Decimal(1.1).pow(player['m'].points);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasMilestone('m', 0)
            }
        },
        23: {
            title: "Point Log Multiplier",
            description: "Point Gain multiplied by log10(points)",
            cost: new Decimal(500),
            effect(){
                var base = 10;
                if(hasUpgrade('b', 14)) base = 2
                var e = Decimal.log(player.points.add(1), base).add(1);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasMilestone('m', 0)
            }
        },
        24: {
            title: "Another New Layer",
            description: "Unlocks a new layer",
            cost: new Decimal(1500),
            unlocked(){
                return hasMilestone('m', 0)
            }
        },
        25: {
            title: "Another New Layer",
            description: "Unlocks a new layer",
            cost: new Decimal("1e4"),
            unlocked(){
                return hasMilestone('m', 0)
            },
            onPurchase(){
                player['p2'].unlocked = true;
            }
        },
        31: {
            title: "Massive Multiplier",
            description: "Multiply Point gain by 10",
            cost: new Decimal("1e6"),
            effect(){
                var e = new Decimal(10);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasUpgrade('p2', 14)
            }
        },
        32: {
            title: "Massive Prestige Point Multiplier",
            description: "Multiply Prestige Point gain by 5",
            cost: new Decimal("1e7"),
            effect(){
                var e = new Decimal(5);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasUpgrade('p2', 14)
            }
        },
        33: {
            title: "Make Upgrades More Useful",
            description: "Multiply Point gain by 1.1 for each Prestige upgrade bought",
            cost: new Decimal("1e8"),
            effect(){
                var e = new Decimal(1);

                if(hasUpgrade('p', 11)) e = e.times(1.1);
                if(hasUpgrade('p', 13)) e = e.times(1.1);
                if(hasUpgrade('p', 12)) e = e.times(1.1);
                if(hasUpgrade('p', 14)) e = e.times(1.1);
                if(hasUpgrade('p', 15)) e = e.times(1.1);
                if(hasUpgrade('p', 21)) e = e.times(1.1);
                if(hasUpgrade('p', 22)) e = e.times(1.1);
                if(hasUpgrade('p', 23)) e = e.times(1.1);
                if(hasUpgrade('p', 24)) e = e.times(1.1);
                if(hasUpgrade('p', 25)) e = e.times(1.1);
                if(hasUpgrade('p', 31)) e = e.times(1.1);
                if(hasUpgrade('p', 32)) e = e.times(1.1);
                if(hasUpgrade('p', 33)) e = e.times(1.1);
                if(hasUpgrade('p', 34)) e = e.times(1.1);
                if(hasUpgrade('p', 35)) e = e.times(1.1);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasUpgrade('p2', 14)
            }
        },
        34: {
            title: "Cheaper Multipliers",
            description: "Cheapen Multiplication Points by 50x",
            cost: new Decimal("5e8"),
            effect(){
                var e = new Decimal(50);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasUpgrade('p2', 14)
            }
        },
        35: {
            title: "Buff Points Become (Very) Useful",
            description: "Multiply Point Gain by (Buff Points + 1) ^ 2",
            cost: new Decimal("1e9"),
            effect(){
                var e = player['b'].points.add(1).pow(2);

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return hasUpgrade('p2', 14)
            }
        }
    }
})
addLayer("m", {
    name: "multiplication",
    symbol: "M",
    position: 2,
    startData(){
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#c9b1fc",
    requires: function() {
        req = new Decimal("1e3") ;
        req = req.div(layers['p2'].effect());
        req = req.div(effectOfUpgrade('p', 34));
        req = req.div(buyableEffect('pancake', 14))
        return req;
    },
    resource: "multiplication points",
    baseResource: "points",
    baseAmount(){return player.points},
    type: "static",
    exponent: new Decimal(2),
    gainMult(){
        mult = new Decimal(1)
        return mult
    },
    gainExp(){
        return new Decimal(1)
    },
    row: 0,
    layerShown(){
        return hasUpgrade('p', 14)
    },
    effect(){
        var strength = new Decimal(2)

        strength = strength.times(effectOfUpgrade('b', 13))

        var e = strength.pow(player['m'].points);
        return e;
    },
    effectDescription(){
        return "multiplying point gain by " + format(layers['m'].effect());
    },
    milestones: {
        0: {
            requirementDescription: "3 MP",
            effectDescription: "Unlock the next 5 prestige upgrades",
            done(){ return player['m'].points.gte(3)}
        }
    }
})
addLayer("b", {
    name: "Buffs",
    symbol: "B",
    position: 0,
    startData(){
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#ff6969",
    requires: function() { 
        req = new Decimal("1e5")
        req = req.div(layers['p2'].effect())
        req = req.div(buyableEffect('pancake', 14))
        return req
    },
    resource: "Buff Tokens",
    baseResource: "points",
    baseAmount(){return player.points},
    type: "static",
    exponent: new Decimal(3),
    gainMult(){
        mult = new Decimal(1)
        return mult
    },
    gainExp(){
        return new Decimal(1)
    },
    row: 0,
    layerShown(){
        return hasUpgrade('p', 24)
    },
    upgrades: {
        11: {
            title: "Basic Buff",
            description: "Square effect of 'Basic Multiplier' and 'Another Multiplier'",
            cost: new Decimal(1),
            effect(){
                var e = new Decimal(2)
                return e;
            },
            effectDisplay(){
                return "^" + format(upgradeEffect(this.layer, this.id))
            }
        },
        12: {
            title: "Basic Buff Part 2",
            description: "Square effect of 'Stronger Multiplier'",
            cost: new Decimal(2),
            effect(){
                var e = new Decimal(2)
                return e;
            },
            effectDisplay(){
                return "^" + format(upgradeEffect(this.layer, this.id))
            }
        },
        13: {
            title: "Stronger Multiplication Points",
            description: "Multiply Multiplication Point Strength by 1.2",
            cost: new Decimal(3),
            effect(){
                var e = new Decimal(1.2);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            },
            unlocked(){
                return layers['p2'].layerShown()
            }
        },
        14: {
            title: "Stronger Log Multipliers",
            description: "'Log Multiplier' and 'Point Log Multiplier' use base 2 instead of 10",
            cost: new Decimal(4),
            unlocked(){
                return layers['p2'].layerShown()
            }
        }
    }
})
addLayer("p2", {
    name: "Prestige 2",
    symbol: "P2",
    position: 0,
    startData(){
        return {
            unlocked: false,
            points: new Decimal(0),
            total: new Decimal(0)
        }
    },
    color: "#696969",
    requires: new Decimal("1e4"),
    resource: "Prestige 2 Points",
    baseResource: "prestige points",
    baseAmount(){return player['p'].points},
    type: "normal",
    exponent: new Decimal(0.25),
    gainMult(){
        mult = new Decimal(1)

        mult = mult.times(buyableEffect('pancake', 13))

        return mult
    },
    gainExp(){
        return new Decimal(1)
    },
    row: 1,
    layerShown(){
        return player['p2'].unlocked;
    },
    upgrades: {
        11: {
            title: "Even More Points",
            description: "Multiply Point gain by 4",
            cost: new Decimal(1),
            effect(){
                var e = new Decimal(4);

                return e;
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        12: {
            title: "I am running out of name ideas",
            description: "Multiply Prestige Point gain by 3",
            cost: new Decimal(5),
            effect(){
                var e = new Decimal(3)

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        13: {
            title: "Log Multiplier to Prestige Points and Points",
            description: "Points and Prestige Points are both multiplied by Log10(Total Prestige 2 Points)",
            cost: new Decimal(10),
            effect(){
                var e = player['p2'].total.add(1).log(10).add(1)

                return e
            },
            effectDisplay(){
                return "x" + format(upgradeEffect(this.layer, this.id));
            }
        },
        14: {
            title: "More Upgrades",
            description: "Unlock the next 5 prestige upgrades",
            cost: new Decimal(25)
        },
        15: {
            title: "Breakfast Time",
            description: "Unlock the next layer",
            cost: new Decimal("1e3")
        }
    },
    effect(){
        var e = player['p2'].points.add(1).pow(2);

        return e
    },
    effectDescription(){
        return "dividing buff token and multiplication point costs by " + format(layers['p2'].effect());
    },
    branches: ["p", "m", "b"]
})
addLayer('pancake', {
    name: "Pancakes",
    symbol: "PC",
    position: 1,
    startData(){
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#4d3117",
    requires: new Decimal("1e10"),
    resource: "Pancakes",
    baseResource: "Prestige Points",
    baseAmount(){return player['p'].points},
    type: "normal",
    exponent: new Decimal(0.5),
    gainMult(){
        mult = new Decimal(1);
        return mult;
    },
    gainExp(){
        return new Decimal(1)
    },
    row: 1,
    layerShown(){
        return hasUpgrade('p2', 15)
    },
    buyables: {
        11: {
            title: "Butter",
            cost(x){
                linear = new Decimal(1);
                quad = x.add(1).pow(1.1)
                exp = new Decimal(1.1).pow(x)
                qexp = new Decimal(1.01).pow(x.pow(2))
                return linear.times(quad).times(exp).times(qexp)
            },
            effect(x){
                var e = new Decimal(1.2).pow(x)
                return e;
            },
            display(){
                desc = "Multiplies Point Gain";
                currenteff = "current: x" + format(buyableEffect('pancake', 11));
                cost = "Cost: " + format(this.cost(getBuyableAmount('pancake', 11))) + " " + layers[this.layer].resource;
                return desc + "\n" + currenteff + "\n" + cost;
            },
            canAfford(){
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        12: {
            title: "Syrup",
            cost(x){
                linear = new Decimal(10);
                quad = x.add(1).pow(1.5)
                exp = new Decimal(1.2).pow(x)
                qexp = new Decimal(1.02).pow(x.pow(2))
                return linear.times(quad).times(exp).times(qexp)
            },
            effect(x){
                var e = new Decimal(1.1).pow(x)
                return e;
            },
            display(){
                desc = "Multiplies Prestige Point Gain";
                currenteff = "current: x" + format(buyableEffect(this.layer, this.id));
                cost = "Cost: " + format(this.cost(getBuyableAmount(this.layer, this.id))) + " " + layers[this.layer].resource;
                return desc + "\n" + currenteff + "\n" + cost;
            },
            canAfford(){
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        13: {
            title: "Jam",
            cost(x){
                linear = new Decimal("1e3");
                quad = x.add(1).pow(2)
                exp = new Decimal(1.5).pow(x)
                qexp = new Decimal(1);
                sexp = new Decimal(2).pow(new Decimal(1.2).pow(x))
                return linear.times(quad).times(exp).times(qexp).times(sexp)
            },
            effect(x){
                var e = new Decimal(1.1).pow(x)
                return e;
            },
            display(){
                desc = "Multiplies Prestige 2 Point Gain";
                currenteff = "current: x" + format(buyableEffect(this.layer, this.id));
                cost = "Cost: " + format(this.cost(getBuyableAmount(this.layer, this.id))) + " " + layers[this.layer].resource;
                return desc + "\n" + currenteff + "\n" + cost;
            },
            canAfford(){
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        14: {
            title: "Jam",
            cost(x){
                linear = new Decimal("1e5");
                quad = new Decimal(1)
                exp = new Decimal(1.5).pow(x)
                qexp = new Decimal(2).pow(x.pow(2));
                sexp = new Decimal(2).pow(new Decimal(1.3).pow(x));
                return linear.times(quad).times(exp).times(qexp).times(sexp)
            },
            effect(x){
                var e = new Decimal(2).pow(x)
                return e;
            },
            display(){
                desc = "Divides cost of multiplication points and buff tokens";
                currenteff = "current: x" + format(buyableEffect(this.layer, this.id));
                cost = "Cost: " + format(this.cost(getBuyableAmount(this.layer, this.id))) + " " + layers[this.layer].resource;
                return desc + "\n" + currenteff + "\n" + cost;
            },
            canAfford(){
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        }
    },
    branches: ['p', 'm', 'b']
})