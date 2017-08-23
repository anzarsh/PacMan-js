(function(){
	var Map = function(){
		this.data = [];
		this.width = 0;
		this.height = 0;
	};

	Map.prototype.load = function(file, callback, error){
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", file, true);
		xhr.overrideMimeType("text/plain");
		xhr.onreadystatechange = function(e){
			if(xhr.readyState == 4){
				if (xhr.status == 200){

					if(xhr.responseText.match(/P/g).length>2) {
						error("Не верный формат расположения PacMan");
						return ;
					}
					
					var tempMap = xhr.responseText.split(/\n/);

					
					for (var i = 0; i<tempMap.length; i++){
						tempMap[i] = tempMap[i].replace(/[^012P]/g, "");
					}
					


					var width = tempMap[0].length;
					
					for (var i = 1; i<tempMap.length; i++){
						if(tempMap[i].length != width){
							error("Не верный формат карты");
							return ;
						}
					}

					self.width = width;
					self.height = tempMap.length;
					self.data = tempMap.join("").split("");

					var pacManIndex = self.data.indexOf("P");
					var pacManIndex2 = self.data.lastIndexOf("P");
					console.log(pacManIndex, pacManIndex2);
					var pacManX = ((pacManIndex%self.width) + (pacManIndex2%self.width)) / 2;
					var pacManY = (Math.floor(pacManIndex/self.width) + Math.floor(pacManIndex2/self.width)) / 2;
					console.log(pacManX, pacManY);
					var point = {
						x: pacManX*8+4,
						y: pacManY*8+4
					};

					self.data[pacManIndex] = "0";
					self.data[pacManIndex2] = "0";

					callback(self, point);

				} else {
					error("Map load status:" + xhr.status + " : " + xhr.statusText);
				}
			}
		};
		xhr.send(null);
	};

	Map.prototype.canGo = function(x, y, direction){
		if(direction === "left"){--x; x=x<0?this.width-1:x;}
		else if(direction === "right"){++x;x=x%this.width;}
		else if(direction === "top"){--y;y=y<0?this.height-1:y}
		else if(direction === "bottom"){++y;y=y%this.height;}

		return this.data[y*this.width+x] == 0;
	};

	window.pacman = window.pacman || {};
	window.pacman.Map = Map;
})();