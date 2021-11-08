jQuery.sap.declare("com.sharan.project.store_ext.Component");
jQuery.sap.registerModulePath("com.sharan.apps", "../apps"); //external

sap.ui.component.load({
	name: "com.sharan.project.store",
	url: "../store"
});

this.com.sharan.project.store.Component.extend("com.sharan.project.store_ext.Component", {
	metadata: {
		manifest: "json"
	}
});