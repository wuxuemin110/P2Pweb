'use strict';

angular.module('myApp.paymentPlans', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/user/paymentPlans', {
			templateUrl: 'templates/user/paymentPlans.html',
			controller: 'paymentPlansCtrl'
		});
	}])

	.controller('paymentPlansCtrl', function($scope, paymentPlansService, $http, redPackageService, $location, $filter,userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};
		// 检测登录
		$scope.className1 = "ddhover";
		$scope.personaCurrent = 3;
		$scope.queryData = {};
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = "/login";
			return 0;
		}

		//获取用户信息
		$scope.getUserInfo = function() {
			$http.get(
				HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.UserInfo = responseData.resultData;
				} else{
					userOnlineBankService2.alertInfo(responseData);
				}
				$scope.UserInfo.width = 33;

				if($scope.UserInfo.hasCardId != false) {
					$scope.UserInfo.width = 66;
				}
				if($scope.UserInfo.hasBankCard != false) {
					$scope.UserInfo.width = 100;
				}
				//				
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
		//查询回款计划      
		$scope.riskData = {
			token: token,
			page: 1,
			limit: 10,
			status: "",
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
			//				var startDate = new Date(data.startDate);
			//				data.startDate = startDate.getTime();
			//			} else {
			//				data.startDate = "";
			//			}
			//			if(data.endDate != "") {
			//				var endDate = new Date(data.endDate);
			//				data.endDate = endDate.getTime();
			//			} else {
			//				data.endDate = "";
			//			}
			return redPackageService.selectPage("/user/" + userId + "/repays", data).then(function() {
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
		//		 $scope.getUserInfo();
		//		 var queryData="&status="+"&startDate="+"&endDate=";
		//		 var url="/user/repays?token="+token;
		//		 //查询回款计划 
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
		//					//console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
		//				});
		//		 	
		//		 }
		//      // 获取回款计划  
		//      $scope.synPaymentPlan = paymentPlansService.synPaymentPlans(url,queryData).then(function() {
		//					$scope.totalPaymentPlan = paymentPlansService.getTotal().totalPaymentPlan;
		//					$scope.paymentplans = paymentPlansService.selectPaymentPlans(1);
		//					$scope.paymentplanPages = paymentPlansService.getPaymentPlanPages();
		//					//console.log($scope.totalPaymentPlan, $scope.paymentplans, $scope.paymentplanPages);
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
		//			//console.log($scope.nowPaymentPlanPage);
		//		};
		//		$scope.nowPaymentPlanPage = 1;

	})

	.factory('paymentPlansService', function($http, $mdDialog) {

		var paymentplans;
		var eachPageItems = 10;

		var paymentplanPages;

		var totalPaymentPlan = 0;

		return {
			getTotal: function() {
				return {
					totalPaymentPlan: totalPaymentPlan,
				}
			},

			synPaymentPlans: function(url, queryData) {
				//console.log(url,queryData);
				return $http.get(HOST_URL + url + queryData).success(function(responseData) {
					paymentplans = responseData.resultData;
					totalPaymentPlan = paymentplans.length;
					var resultArr = [];

					for(var i = 0; i < Math.ceil(paymentplans.length / eachPageItems); i++) {
						resultArr[i] = i;
					}
					paymentplanPages = resultArr;
//					console.log(paymentplanPages);

				}).error(function() {

				});
			},
			selectPaymentPlans: function(page) {
				var result = [];
				var limit;
				if(page == paymentplanPages.length || paymentplanPages.length == 0) {
					limit = paymentplans.length;
				} else {
					limit = page * eachPageItems;
				}
				for(var i = (page - 1) * eachPageItems; i < limit; i++) {
					paymentplans[i].indexId = i + 1;
					result.push(paymentplans[i]);
				}
				return result;
//				console.log(result, limit);
			},
			getPaymentPlanPages: function() {
				return paymentplanPages;
			},
		}
	});