(function(){
	var Start = function(ctx){
		
		var self = this;
		
		this.ctx = ctx;
		this.pacman = new pacman.Pacman(ctx, 7, 100, 100);
		
		this.map = new pacman.Map();
		this.map.load("map/lvl1.map", function(map){
			console.log(map);
		}, function(err){
			console.error(err);
		});


		this.keys = {};
		this.stepDelay = 10;
		window.addEventListener("keydown", function(e){

			var key = e.keyCode;
			if(!self.keys[key]){

				for (k in self.keys){
					clearInterval(self.keys[k]);
					delete self.keys[key];
				}

				self.keys = {};
				if (key == 37){
				
					self.keys[key] = setInterval(function(){
						game.pacman.left();
					}, self.stepDelay);
				
				} else	if (key == 38){
				
					self.keys[key] = setInterval(function(){
						game.pacman.top();
					}, self.stepDelay);
				
				} else if (key == 39){
				
					self.keys[key] = setInterval(function(){
						game.pacman.right();
					}, self.stepDelay);
				
				} else if (key == 40){
					self.keys[key] = setInterval(function(){
						game.pacman.bottom();
					}, self.stepDelay);
				
				}

			}
		});

		window.addEventListener("keyup", function(e){
			var key = e.keyCode;
			if(self.keys[key]){
				clearInterval(self.keys[key]);
				delete self.keys[key];
			}
		});

	};

	window.pacman = window.pacman || {};
	window.pacman.Start = Start;
})();