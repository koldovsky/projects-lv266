var app = angular.module('GroupApp', ['ngMaterial']);

// https://stackoverflow.com/a/16349631
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

    $scope.getPhotoUrl = function(student) {
        return student.photo || `images/students/${getLastName(student.name)}.jpg`;
    }

    function getLastName(fullName) {
        return fullName.trim().split(' ').pop().replace(/'+/g, '').toLowerCase();
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        {
          "name": "Anna Dron",
          "websiteUrl": "https://annettedr.github.io/my_website_html/index.html",
          "codeSourceUrl": "https://github.com/AnnetteDr/my_website_html",
          "cvUrl": ""
        },
        {
          "name": "Bohdan Klius",
          "websiteUrl": "https://bohdanklius.github.io/my-web-site-bootstrap/",
          "codeSourceUrl": "https://github.com/bohdanklius",
          "cvUrl": "https://www.linkedin.com/in/bohdan-klius-26122b151/"
        },
        {
          "name": "Khrystyna Pavlyshak",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Kostiantyn Kondratiuk",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": "https://www.linkedin.com/in/киндермен"
        },
        {
          "name": "Lev Pentsko",
          "websiteUrl": "https://levpentsko.github.io/lesson-04/",
          "codeSourceUrl": "https://github.com/LevPentsko",
          "cvUrl": "https://www.linkedin.com/in/lev-pentsko-459310144/"
        },
        {
          "name": "Mariya Nester",
          "websiteUrl": "https://marichkanester.github.io/MarichkaNester/",
          "codeSourceUrl": "https://github.com/marichkanester",
          "cvUrl": "https://www.linkedin.com/in/marichka-nester-866325151/"
        },
        {
          "name": "Nadiia Pavliuk",
          "websiteUrl": "https://nadiiapavliuk.github.io/personal-web-site/",
          "codeSourceUrl": "https://github.com/nadiiapavliuk",
          "cvUrl": ""
        },
        {
          "name": "Oleksandr Rubakha",
          "websiteUrl": "https://elvis0994.github.io/representantive_website/",
          "codeSourceUrl": "https://github.com/Elvis0994/representantive_website",
          "cvUrl": "https://www.linkedin.com/in/oleksandr-rubakha-0344b1149/"
        },
        {
          "name": "Petro Iashchyshyn",
          "websiteUrl": "https://petro8585.github.io/myproject/",
          "codeSourceUrl": "https://github.com/Petro8585",
          "cvUrl": "https://www.linkedin.com/in/petro-iashchyshyn-278029151/"
        },
        {
          "name": "Vasyl Yarmola",
          "websiteUrl": "https://vyarmola.github.io/yarapt/",
          "codeSourceUrl": "https://github.com/vyarmola/yarapt",
          "cvUrl": "https://www.linkedin.com/in/vasyl-yarmola-70622b151/"
        },
        {
          "name": "Viktor Hordubei",
          "websiteUrl": "https://viktor19931.github.io/my-grid/",
          "codeSourceUrl": "https://github.com/Viktor19931/my-grid",
          "cvUrl": "https://www.linkedin.com/in/viktor-hardubej-426007150/"
        },
        {
          "name": "Vladyslav Hutsal",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Anatolii Ostapuk",
          "websiteUrl": "https://ostapuk.github.io/project_final/",
          "codeSourceUrl": "https://github.com/Ostapuk/project_final",
          "cvUrl": "https://www.linkedin.com/in/anatolii-ostapuk-336303151/"
        },
        {
          "name": "Heorhii Rezvanov",
          "websiteUrl": "https://georger77.github.io/Finalshopproject/",
          "codeSourceUrl": "https://github.com/georger77/Finalshopproject",
          "cvUrl": "https://www.linkedin.com/in/heorhii-rezvanov-605292151/"
        },
        {
          "name": "Maryna Savka",
          "websiteUrl": "https://samarinka.github.io/personal-site/",
          "codeSourceUrl": "https://github.com/Samarinka/personal-site",
          "cvUrl": "https://www.linkedin.com/in/marina-savka-2894ab150/"
        },
        {
          "name": "Nataliya Bereziy",
          "websiteUrl": "https://nataliyabereziy.github.io/busi-do/",
          "codeSourceUrl": "https://github.com/NataliyaBereziy/busi-do",
          "cvUrl": ""
        },
        {
          "name": "Nazar Haidamakha",
          "websiteUrl": "https://gnaizer.github.io/personal-page/",
          "codeSourceUrl": "https://github.com/gnaizer/personal-page",
          "cvUrl": "https://www.linkedin.com/in/nazar-gaidamaka-b4294670/"
        },
        {
          "name": "Nikita Saakyan",
          "websiteUrl": "https://ajax01-tyler01.c9users.io/index.html",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Roman Danylyuk",
          "websiteUrl": "https://shipsoft1.github.io/my-website-01/",
          "codeSourceUrl": "https://github.com/shipsoft1/my-website-01",
          "cvUrl": ""
        },
        {
          "name": "Vasyl Dumych",
          "websiteUrl": "https://vdoom8.github.io/hapok/",
          "codeSourceUrl": "https://github.com/vdoom8/hapok",
          "cvUrl": "https://www.linkedin.com/in/vasyl-dumych-58019314b/"
        },
        {
          "name": "Volodymyr Batsyk",
          "websiteUrl": "https://vovabatsyk.github.io/BatsykVolodymyr/",
          "codeSourceUrl": "https://github.com/vovabatsyk/BatsykVolodymyr",
          "cvUrl": "https://www.linkedin.com/in/volodymyr-batsyk-081497151/"
        },
        {
          "name": "Yaroslav Tymoshchuk",
          "websiteUrl": "https://yt48.github.io/project/",
          "codeSourceUrl": "https://github.com/yt48/project",
          "cvUrl": "https://www.linkedin.com/in/yaroslav-tymoschuk-a502aa151/"
        }
      ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
