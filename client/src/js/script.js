import $ from "jquery";

$(() => {
    console.log("jQuery works");
    $.get("/api/test", (res) => console.log(res));
});