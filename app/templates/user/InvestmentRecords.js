'use strict';

angular.module('myApp.InvestmentRecords', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/user/InvestmentRecords', {
			templateUrl: 'templates/user/InvestmentRecords.html',
			controller: 'InvestmentRecordsCtrl'
		});
	}])

	.controller('InvestmentRecordsCtrl', function($scope, InvestmentRecordsService, redPackageService, $http, $location, $filter, userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};

		$scope.className1 = "ddhover";
		$scope.personaCurrent = 2;
		$scope.idcard = {};
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		// 检测登录
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = "/login";
			return 0;
		} else {
			$scope.getUserInfo = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					// $scope.UserInfo = responseData;
					// $scope.UserInfo.width = 33;
					// console.log($scope.UserInfo );

					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;
						//                  console.log($scope.UserInfo );

					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					$scope.UserInfo.width = 33;

					if($scope.UserInfo.hasCardId != false) {
						$scope.UserInfo.width = 66;
						//					console.log($scope.UserInfo.hasCardId );
					}
					if($scope.UserInfo.hasBankCard != false) {
						$scope.UserInfo.width = 100;
					}

					// if($scope.userInfo.hasCardId != true){
					//     $scope.showRealname = 2;
					//     console.log($scope.showRealname);
					// }
					// if($scope.UserInfo.hasTradePassword != true && $scope.UserInfo.hasCardId != false) { //已实名认证且没设置交易密码
					//     $scope.showfrom = 2;
					//     console.log($scope.showRealname);
					// }
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

			// 获取累计资金数据
			$scope.totalData = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/totalData?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.totalData = responseData.resultData;
						//                  console.log($scope.totalData);
					} else {
						userOnlineBankService2.alertInfo(responseData);
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
			$scope.totalData();

			// 查询投资记录
			$scope.riskData = {
				token: token,
				page: 1,
				limit: 10,
				status: "",
				startDate: "",
				endDate: ""
			};
			$scope.selectPage = function(page) {
				if(page <= 1) {
					page = 1;
				} else if(page >= $scope.totalPages) {
					page = $scope.totalPages;
				}
				$scope.riskData['page'] = page;
				var data = angular.copy($scope.riskData);
				//          console.log(data);
				if(data.startDate == null) {
					data.startDate = "";
				}
				if(data.endDate == null) {
					data.endDate = "";
				}
				data.startDate = $filter('date')(data.startDate, "yyyyMMddHHmmss");
				data.endDate = $filter('date')(data.endDate, "yyyyMMddHHmmss");
				//				if(data.startDate != "") {
				//					//		 	var startDate= new Date(data.startDate);
				//					//		 	data.startDate=startDate.getTime();
				////					console.log(data.startDate);
				//					data.startDate = $filter('date')(data.startDate, "yyyyMMddHHmmss");
				//
				//					//
				//				} else {
				//					data.startDate = "";
				//				}
				//				if(data.endDate != "") {
				//					//		 		var endDate=new Date(data.endDate);
				//					//		 		data.endDate=endDate.getTime();
				//					data.endDate = $filter('date')(data.endDate, "yyyyMMddHHmmss");
				//				} else {
				//					data.endDate = "";
				//				}
				//				console.log(data);
				return redPackageService.selectPage("/user/" + userId + "/investments", data).then(function() {
					var tmpObject = redPackageService.getResult();

					$scope.itemList = tmpObject.itemList;
					//					             console.log($scope.itemList);
					$scope.nowPage = tmpObject.nowPage;
					$scope.sumCount = tmpObject.sumCount;
					$scope.pages = tmpObject.pages;
					$scope.isShowDot = tmpObject.isShowDot;
					$scope.totalPages = tmpObject.totalPages;
					$scope.startIndex = tmpObject.startIndex;
				});
			};
			$scope.selectPage(1);

			//点击下载协议
			$scope.downloadProtocol = function(planId) {
				window.open(HOST_URL + "user/" + userId + "/investment/" + planId + "/pdf?token=" + token);
			}
			//     var queryData="&status="+"&startDate="+"&endDate=";
			//	   var url="/user/investments?token="+token;
			//		 
			//		 $scope.selectPage =function(){
			//		 	var startDate="";
			//		 	var endDate="";
			//		 	var status=""
			//		 	if($scope.queryData.startDate!=undefined){
			//		 	startDate= new Date($scope.queryData.startDate);
			//		 	startDate=startDate.getTime();
			//		 	}
			//		 	if($scope.queryData.status!=undefined){
			//		 		status=$scope.queryData.status;
			//		 	}
			//		 	if($scope.queryData.endTime!=undefined){
			//		 		endDate=new Date($scope.queryData.endTime);
			//		 		endDate=endDate.getTime();
			//		 	}
			//		 	
			//		 	queryData="&status="+status+"&startDate="+startDate+"&endDate="+endDate;
			//		 	
			//		 	console.log(queryData);
			//		 	 $scope.synPaymentPlan = paymentPlansService.synPaymentPlans(url,queryData).then(function() {
			//					$scope.totalPaymentPlan = paymentPlansService.getTotal().totalPaymentPlan;
			//					$scope.paymentplans = paymentPlansService.selectPaymentPlans(1);
			//					$scope.paymentplanPages = paymentPlansService.getPaymentPlanPages();
			//					console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
			//				});
			//		 	
			//		 }
			//      // 获取交易资金明细 
			//      $scope.synPaymentPlan = paymentPlansService.synPaymentPlans(url,queryData).then(function() {
			//					$scope.totalPaymentPlan = paymentPlansService.getTotal().totalPaymentPlan;
			//					$scope.paymentplans = paymentPlansService.selectPaymentPlans(1);
			//					$scope.paymentplanPages = paymentPlansService.getPaymentPlanPages();
			////					console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
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
			//		
		}
	})

	.factory('InvestmentRecordsService', function($http, $mdDialog) {

		return {

		}
	});