sap.ui.define([
	"com/sharan/project/store/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.sharan.project.store.controller.Home", {
		onInit: function () {
			var oData = {
				Tile: {
					Orders: {
						count: 0,
						state: "Loading"
					},
					Products: {
						count: 0,
						state: "Loading"
					}
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "mStore");
		},
		onAfterRendering: function () {
			var mStore = this.getView().getModel("mStore");
			var mNorthwind = this.getView().getModel("mNorthwind");
			mNorthwind.read("/Orders", {
				success: function (oResponse) {
					mStore.setProperty("/Tile/Orders", {
						count: oResponse.results.length,
						state: "Loaded"
					});
				}, error: function (oError) {
					mStore.setProperty("/Tile/Orders/state", "Failed");
				}
			});
			mNorthwind.read("/Current_Product_Lists", {
				success: function (oResponse) {
					mStore.setProperty("/Tile/Products", {
						count: oResponse.results.length,
						state: "Loaded"
					});
				}, error: function (oError) {
					mStore.setProperty("/Tile/Products/state", "Failed");
				}
			});
		},
		onTilePress: function (sRoute) {
			this.getRouter().navTo(sRoute);
		}
	});
});
