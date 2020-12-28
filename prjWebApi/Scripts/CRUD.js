$(document).ready(function () {
    var apiurl = "https://localhost:44327/api/Customer";

    $("#btnCreate").on("click", fnCreate);
    $("#btnEdit").on("click", fnEdit);
    $("#btnDelete").on("click", fnDelete);

    fnLoadData();
    function fnLoadData() {
        $.ajax({
            url: apiurl,
            type: 'GET',
            success: function (data) {
                $("#tableshow").empty();

                for (var i = 0; i < data.length; i++) {
                    $("#tableshow").append
                        (
                            "<tr>" +
                            "<td>" + data[i].fId + "</td>" +
                            "<td>" + data[i].fName + "</td>" +
                            "<td>" + data[i].fPhone + "</td>" +
                            "<td>" + data[i].fEmail + "</td>" +
                            "<td>" + data[i].fAddress + "</td>" +
                            "<td><input type='button' value='選取' id='btnSelect" + i + "' class='btn btn-info' /></td>" +
                            "</tr>"
                        );
                    $("#btnSelect" + i).on("click", { fid: data[i].fId }, fnSelectData);
                }

                $("#fid").val("");
                $("#fname").val("");
                $("#fphone").val("");
                $("#femail").val("");
                $("#faddress").val("");
            }
        });
    }

    //選取某一筆資料
    function fnSelectData(event) {
        var fid = event.data.fid;

        $.ajax({
            url: apiurl + "?fid=" + encodeURI(fid),
            type: 'GET',
            success: function (data) {
                $("#fid").val(data.fId);
                $("#fname").val(data.fName);
                $("#fphone").val(data.fPhone);
                $("#femail").val(data.fEmail);
                $("#faddress").val(data.fAddress);
            }
        });
    }

    //新增
    function fnCreate() {
        var r = confirm("確定要新增嗎?");

        if (r == true) {
            var fname, fphone, femail, faddress;
            fname = $("#fname").val();
            fphone = $("#fphone").val();
            femail = $("#femail").val();
            faddress = $("#faddress").val();

            var data = "?fname=" + fname + "&fphone=" + fphone + "&femail=" + femail + "&faddress=" + faddress;
            
            $.ajax({
                url: apiurl + encodeURI(data),
                type: 'POST',
                success: function (result) {
                    if (result != 0) {
                        alert("新增成功");
                        fnLoadData();
                    }
                    else {
                        alert("新增失敗");
                    }
                }
            });
        }
    }

    //編輯
    function fnEdit() {
        var r = confirm("確定要修改嗎");

        if (r == true) {
            var fid, fname, fphone, femail, faddress;
            fid = $("#fid").val();
            fname = $("#fname").val();
            fphone = $("#fphone").val();
            femail = $("#femail").val();
            faddress = $("#faddress").val();

            var data = "?fid=" + fid + "&fname=" + fname +
                "&fphone=" + fphone + "&femail=" + femail +
                "&faddress=" + faddress;

            $.ajax({
                url: apiurl + encodeURI(data),
                type: 'PUT',
                success: function (result) {
                    if (result != 0) {
                        alert("修改成功");
                        fnLoadData();
                    } else {
                        alert("修改失敗");
                    }
                }
            })
        }
    }

    //刪除
    function fnDelete() {
        var r = confirm("確定要刪除嗎?");

        if (r == true) {
            var fid = $("#fid").val();

            $.ajax({
                url: apiurl + "?fid=" + encodeURI(fid),
                type: 'DELETE',
                success: function (result) {
                    if (result != 0) {
                        alert("刪除成功");
                        fnLoadData();
                    } else {
                        alert("刪除失敗");
                    }
                }
            });
        }
    }
});

