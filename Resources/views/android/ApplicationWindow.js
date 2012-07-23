//Application Window Component Constructor
ApplicationWindow = function() {

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#fff',
		navBarHidden : false
	});
	
	function loginuser(){
		
	}
	
	function updatedb(){
		SignInWindow = require('controllers/LoginUser');
		SignInWindow.LoginUser();
		reloadtable();
	}
	
	//Asign menu options for Android
	self.activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			var m1 = menu.add({ title : 'Agregar Cliente' });
			m1.setIcon("/android/icons/ic_menu_add.png");
			//m1.addEventListener('click', doAdd);
			
			var m2 = menu.add({ title : 'Actualizar' });
			m2.setIcon("/android/icons/ic_menu_refresh.png");
			m2.addEventListener('click', updatedb);
			
			var m3 = menu.add({ title : 'Salir' });
			m3.setIcon("/android/icons/ic_lock_power_off.png");
			//m3.addEventListener('click', logoutUser);
			
			var m4 = menu.add({ title : 'Info' });
			m4.setIcon("/android/icons/ic_menu_info_details.png");
			//m4.addEventListener('click', list);
		};

	var db = Titanium.Database.open('catalogocliente');
	db.execute('CREATE TABLE IF NOT EXISTS catalogocliente (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)');
	db.close();
	
	function reloadtable(){
		//This is the array we'll use to back the table view
		var data = [];
	
		//Get data for tableview
		var db = Titanium.Database.open('catalogocliente');
		var rows = db.execute('SELECT * FROM catalogocliente');
		while (rows.isValidRow()) {
			data.push({
				title : rows.fieldByName('email'),
				id : rows.fieldByName('id')
			});
			rows.next();
		}
		rows.close();
		db.close();
	
		// create table view
		var table = Titanium.UI.createTableView({
			data : data,
			editable : true
		});
		self.add(table);
	}
	reloadtable();

	return self;
}
//make constructor function the public component interface
module.exports = ApplicationWindow;
