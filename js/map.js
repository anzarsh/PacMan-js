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

					callback(self);

				} else {
					error("Map load status:" + xhr.status + " : " + xhr.statusText);
				}
			}
		};
		xhr.send(null);
	};

	window.pacman = window.pacman || {};
	window.pacman.Map = Map;
})();