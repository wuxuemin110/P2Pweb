'use strict';

angular.module('myApp.fundDetails', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/user/fundDetails', {
			templateUrl: 'templates/user/fundDetails.html',
			controller: 'fundDetailsCtrl'
		});
	}])

	.controller('fundDetailsCtrl', function($scope, fundDetailsService, redPackageService, $http, $location, $filter, userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};
		$scope.queryData = {};
		// 检测登录
		$scope.className1 = "ddhover";
		$scope.personaCurrent = 4;
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = "/login";
			return 0;
		} else {
			$scope.getUserInfo = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					$scope.UserInfo.width = 33;

					if($scope.UserInfo.hasCardId != false) {
						$scope.UserInfo.width = 66;
					}
					if($scope.UserInfo.hasBankCard != false) {
						$scope.UserInfo.width = 100;
					}
				}).error(function(responseData) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			}
			$scope.getUserInfo();
		}
		// 查询交易资金明细

		$scope.riskData = {
			token: token,
			page: 1,
			limit: 10,
			state: "",
			startDate: "",
			endDate: ""
		};

		//		 $scope.selectPage = function (page) {
		//		     if (page <= 1) {
		//              page = 1;
		//          } else if (page >= $scope.totalPages) {
		//              page = $scope.totalPages;
		//          }
		//      	$scope.riskData['page'] = page;
		//          var data = angular.copy($scope.riskData);
		//          console.log(data);
		//          return redPackageService.selectPage("/user/" + userId + "/tradeRecords",  data).then(function () {
		//              var tmpObject = redPackageService.getResult();
		//              $scope.itemList = tmpObject.itemList;
		//              $scope.nowPage = tmpObject.nowPage;
		//               $scope.sumCount = tmpObject.sumCount;
		//              $scope.pages = tmpObject.pages;
		//              $scope.isShowDot = tmpObject.isShowDot;
		//              $scope.totalPages = tmpObject.totalPages;
		//              $scope.startIndex = tmpObject.startIndex;
		//          });
		//      };

		$scope.selectPage = function(page) {
			if(page <= 1) {
				page = 1;
			} else if(page >= $scope.totalPages) {
				page = $scope.totalPages;
			}
			$scope.riskData['page'] = page;
			var data = angular.copy($scope.riskData);
			if(data.startDate == null) {
				data.startDate = "";
			}
			if(data.endDate == null) {
				data.endDate = "";
			}
			data.startDate = $filter('date')(data.startDate, "yyyyMMddHHmmss");
			data.endDate = $filter('date')(data.endDate, "yyyyMMddHHmmss");
			//			console.log(data);

			//			if(data.startDate != "") {
			//				//				var startDate = new Date(data.startDate);
			//				//				data.startDate = startDate.getTime();
			//				data.startDate = $filter('date')(data.startDate, "yyyyMMddHHmmss");
			//				//
			//			} else {
			//				data.startDate = "";
			//			}
			//			if(data.endDate != "") {
			//				//				var endDate = new Date(data.endDate);
			//				//				data.endDate = endDate.getTime();
			//				data.endDate = $filter('date')(data.endDate, "yyyyMMddHHmmss");
			//			} else {
			//				data.endDate = "";
			//			}

			return redPackageService.selectPage("/user/" + userId + "/tradeRecords", data).then(function() {
				var tmpObject = redPackageService.getResult();
				$scope.itemList = tmpObject.itemList;
				$scope.nowPage = tmpObject.nowPage;
				$scope.sumCount = tmpObject.sumCount;
				$scope.pages = tmpObject.pages;
				$scope.isShowDot = tmpObject.isShowDot;
				$scope.totalPages = tmpObject.totalPages;
				$scope.startIndex = tmpObject.startIndex;
			});
		};
		$scope.selectPage(1);
		//     var queryData="&state="+"&startDate="+"&endDate=";
		//	   var url="/user/"+userId+"/tradeRecords?token="+token;
		//var startDate="";
		//		 	var endDate="";
		//		 	var state=""
		//		 	if($scope.queryData.startDate!=undefined){
		//		 	startDate= new Date($scope.queryData.startDate);
		//		 	startDate=startDate.getTime();
		//		 	}
		//		 	if($scope.queryData.state!=undefined){
		//		 		state=$scope.queryData.state;
		//		 	}
		//		 	if($scope.queryData.endTime!=undefined){
		//		 		endDate=new Date($scope.queryData.endTime);
		//		 		endDate=endDate.getTime();
		//		 	}
		//		 	queryData="&state="+state+"&startDate="+startDate+"&endDate="+endDate;
		//		 	
		//		 	console.log(queryData);
		//		 	 $scope.synPaymentPlan = paymentPlansService.synPaymentPlans(url,queryData).then(function() {
		//					$scope.totalPaymentPlan = paymentPlansService.getTotal().totalPaymentPlan;
		//					$scope.paymentplans = paymentPlansService.selectPaymentPlans(1);
		//					$scope.paymentplanPages = paymentPlansService.getPaymentPlanPages();
		////					console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
		//				});
		//		 	
		//		 }
		//      // 获取交易资金明细 
		//      $scope.synPaymentPlan = paymentPlansService.synPaymentPlans(url,queryData).then(function() {
		//					$scope.totalPaymentPlan = paymentPlansService.getTotal().totalPaymentPlan;
		//					$scope.paymentplans = paymentPlansService.selectPaymentPlans(1);
		//					$scope.paymentplanPages = paymentPlansService.getPaymentPlanPages();
		//					console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
		//				});
		//				
		//	  $scope.selectPaymentPlansPages = function(pages) {
		//			if(pages >= $scope.paymentplanPages.length) {
		//				pages = $scope.paymentplanPages.length;
		//			} else if(pages <= 1) {
		//				pages = 1;
		//			}
		//
		//			$scope.paymentplans = paymentPlansService.selectPaymentPlans(pages);
		//			$scope.nowPaymentPlanPage = pages;
		//			console.log($scope.nowPaymentPlanPage);
		//		};
		//		$scope.nowPaymentPlanPage = 1;
	})

	.factory('fundDetailsService', function($http, $mdDialog) {

		return {

		}
	});