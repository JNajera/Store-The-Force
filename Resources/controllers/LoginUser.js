
exports.LoginUser = function() {

	var force = require('force');

	force.authorize({
		success : function() {
			//If we're logged in,
			//We update the SQL Database
			alert('the Force be with you');	//fetch new salesforce account data
			
			force.request({
				type:'GET',
				url:'/query/?q='+Ti.Network.encodeURIComponent('SELECT correo__c from Cliente__c'), //inlining SOQL query
				callback: function(data) {
					//var rows = [];
					var db = Titanium.Database.open('catalogocliente');
					for (var i = 0, l = data.records.length; i<l; i++) {
						var rec = data.records[i];
						Ti.API.info(JSON.stringify(rec));
							
    					db.execute(' INSERT OR REPLACE INTO catalogocliente (email) VALUES(?)',rec.Correo__c);
					}
					 db.close();
				}
			});
				
			
		},
		error : function() {
			alert('error');
		},
		cancel : function() {
			alert('cancel');
		}
	});
}
//make constructor function the public component interface
//module.exports = LoginUser;
