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
						Items: [],
						Count: 0,
						State: "Loading"
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
						Items: oResponse.results,
						Count: oResponse.results.length,
						State: "Loaded"
					});
				}, error: function (oError) {
					mStore.setProperty("/Tile/Orders/State", "Failed");
				}
			});
		},
		onTilePress: function (sRoute) {
			this.getRouter().navTo(sRoute);
		}
	});
});
