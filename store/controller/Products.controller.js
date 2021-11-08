sap.ui.define([
	"com/sharan/project/store/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.sharan.project.store.controller.Products", {
		onInit: function () {
			var oData = {
				FlexibleColumnLayout: {
					layout: "OneColumn"
				},
				selected: {
					detail: {}
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "mProducts");
		},
		onAfterRendering: function () {
			if (this.extHookOnAfterRendering) { 
				this.extHookOnAfterRendering(); 
			}
		},
		onProductClick: function (oEvent) {
			this.fnSetProductDetail(oEvent.getSource().getBindingContext("mNorthwind").getObject());
		},
		onCloseProductDetail: function () {
			this.fnSetProductDetail();
		},
		fnSetProductDetail: function (oData) {
			var mProducts = this.getView().getModel("mProducts");
			if (oData) {
				mProducts.setProperty("/FlexibleColumnLayout/layout", "TwoColumnsMidExpanded");
				mProducts.setProperty("/selected/detail", oData);
			} else {
				mProducts.setProperty("/FlexibleColumnLayout/layout", "OneColumn");
				mProducts.setProperty("/selected/detail", {});
			}
		}
	});
});
