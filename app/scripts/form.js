$(document).ready(function() {
  $("#errDiv").hide();
  $("input:radio[name=matchType]").on('focusout', function(){
    if($('input:radio[name=matchType]:checked').val() != undefined) {
      $("#errDiv").hide();
    }
  });
});
function validateForm() {
  matchType = $('input:radio[name=matchType]:checked').val();
  ownTeam = $("#ownTeamSelect").val();
  oppTeam = $("#oppTeamSelect").val();
  if(matchType == undefined) {
    $("#errDiv").show();
    $("#errMsg").text("Select the match type!");
    return false;
  }
  if(ownTeam == "Select Team" || oppTeam == "Select Team") {
    $("#errDiv").show();
    $("#errMsg").text("Please select both the teams!");
    return false;
  }
  if(ownTeam == oppTeam) {
    $("#errDiv").show();
    $("#errMsg").text("Please select two different teams!");
    return false;
  }
}