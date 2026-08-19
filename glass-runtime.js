/* Reef Island / Villa 86 glass UI runtime overlay.
   This file intentionally leaves 3DVista's generated/signed scripts untouched.
   It only applies visual properties after the tour has been parsed and initialized. */
(function () {
  'use strict';

  var PANEL = {"backgroundColor":["#182838","#53677A"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.38,"backgroundBlur":0.72,"borderRadius":20,"borderSize":1,"borderColor":"#E7F1FA","shadow":true,"shadowColor":"#07111A","shadowOpacity":0.36,"shadowBlurRadius":26,"shadowVerticalLength":8,"shadowSpread":0};
  var SOFT = {"backgroundColor":["#D9E5EE","#91A5B7"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.13,"backgroundBlur":0.76,"borderRadius":22,"borderSize":1,"borderColor":"#EDF6FF","shadow":true,"shadowColor":"#07111A","shadowOpacity":0.24,"shadowBlurRadius":30,"shadowVerticalLength":8,"shadowSpread":0};
  var BUTTON = {"fontFamily":"Arial","fontStyle":"normal","fontColor":"#F7FAFC","backgroundOpacity":0,"rollOverBackgroundColor":["#FFFFFF","#FFFFFF"],"rollOverBackgroundOpacity":0.12,"pressedBackgroundColor":["#FFFFFF","#FFFFFF"],"pressedBackgroundOpacity":0.16,"borderRadius":8,"borderSize":0,"borderColor":"#FFFFFF"};
  var THUMB = {"backgroundColor":["#23384B","#637587"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.35,"backgroundBlur":0.76,"borderRadius":18,"borderSize":1,"borderColor":"#E6F1FB","shadow":true,"shadowColor":"#07111A","shadowOpacity":0.33,"shadowBlurRadius":24,"shadowVerticalLength":7,"shadowSpread":0,"itemBackgroundColor":["#FFFFFF","#FFFFFF"],"itemBackgroundOpacity":0.04,"itemBackgroundBlur":0.18,"itemBorderRadius":10,"itemThumbnailBorderRadius":9,"itemLabelFontFamily":"Arial","itemLabelFontStyle":"normal","itemLabelFontColor":"#F7FAFC","selectedItemLabelFontColor":"#FFCC00","rollOverItemLabelFontColor":"#FFFFFF"};
  var MODAL = {"backgroundColor":["#203446","#74889A"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.24,"backgroundBlur":0.86,"borderRadius":30,"borderSize":1,"borderColor":"#F2F8FF","shadow":true,"shadowColor":"#040B12","shadowOpacity":0.38,"shadowBlurRadius":36,"shadowVerticalLength":10,"shadowSpread":0};
  var CARD = {"backgroundColor":["#F6FBFF","#DCE8F2"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.28,"backgroundBlur":0.84,"borderRadius":26,"borderSize":1,"borderColor":"#FFFFFF","shadow":true,"shadowColor":"#0A1621","shadowOpacity":0.18,"shadowBlurRadius":22,"shadowVerticalLength":6,"shadowSpread":0};
  var ACCENT = {"backgroundColor":["#6CC3FF","#2C7FD1"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.62,"backgroundBlur":0.52,"borderRadius":22,"borderSize":1,"borderColor":"#DFF2FF","shadow":true,"shadowColor":"#0C2236","shadowOpacity":0.22,"shadowBlurRadius":18,"shadowVerticalLength":4,"shadowSpread":0};
  var CTA = {"backgroundColor":["#80CCFF","#3E88D3"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.92,"borderRadius":999,"borderSize":1,"borderColor":"#E4F4FF","fontFamily":"Montserrat","fontStyle":"normal","fontWeight":"bold","fontColor":"#FFFFFF","shadow":true,"shadowColor":"#0A1825","shadowOpacity":0.22,"shadowBlurRadius":16,"shadowVerticalLength":4,"shadowSpread":0,"rollOverBackgroundColor":["#99D7FF","#4D98E3"],"rollOverBackgroundOpacity":1,"pressedBackgroundColor":["#67BDF8","#2E78BF"],"pressedBackgroundOpacity":1};
  var INTRO_BAR = {"backgroundColor":["#263B50","#71869A"],"backgroundColorRatios":[0,1],"backgroundColorDirection":"vertical","backgroundOpacity":0.30,"backgroundBlur":0.84,"borderRadius":20,"borderSize":1,"borderColor":"#EAF4FC","shadow":true,"shadowColor":"#06111B","shadowOpacity":0.30,"shadowBlurRadius":24,"shadowVerticalLength":6,"shadowSpread":0};
  var INTRO_BUTTON = {"backgroundColor":["#FFFFFF","#FFFFFF"],"backgroundOpacity":0.04,"borderRadius":16,"borderSize":0,"fontFamily":"Montserrat","fontStyle":"normal","fontWeight":"bold","fontColor":"#FFFFFF","rollOverBackgroundColor":["#FFFFFF","#FFFFFF"],"rollOverBackgroundOpacity":0.15,"pressedBackgroundColor":["#FFFFFF","#FFFFFF"],"pressedBackgroundOpacity":0.20,"shadow":false};
  var INTRO_TEXT = {"fontFamily":"Montserrat","fontStyle":"normal","fontWeight":"bold","fontColor":"#FFFFFF","textShadowColor":"#07111A","textShadowOpacity":0.34,"textShadowBlurRadius":12,"textShadowHorizontalLength":0,"textShadowVerticalLength":2};

  var GENERAL_BUTTONS = ["Button_0399826A_2D79_4594_41BA_934A50D0E6B4","Button_0A054365_2D09_CB9F_4145_8C365B373D19","Button_0AEB5577_2D08_CE7B_41B6_192923248F4E","Button_0B73474A_2D18_CB95_41B5_180037BA80BC","Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9","Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA","Button_159E8DDD_31FA_0014_41C5_F18F441AF371","Button_159E9DDC_31FA_0015_41B6_CB1D433C7673","Button_159EBDDD_31FA_0014_41C8_935504B30727","Button_159ECDDC_31FA_0014_41B9_2D5AB1021813","Button_159EDDDC_31FA_0014_419A_61C18E43FE01","Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB","Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0","Button_15A10DDC_31FA_0014_4185_021C898E177D","Button_15A12DDC_31FA_0014_416B_ED845741AE5F","Button_15A13DDC_31FA_0014_41C5_41AE80876834","Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1","Button_15EF2665_3106_0035_41AE_9BACA1A48D02","Button_15F5A318_3106_001C_41C5_9AA2EF2184CF","Button_168CA310_3106_01EC_41C7_72CE0522951A","Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3","Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA","Button_168D3310_3106_01EC_41AC_5D524E4677A5","Button_168D5310_3106_01EC_41B5_96D9387401B8","Button_168D6310_3106_01EC_41B8_A0B6BE627547","Button_168D9311_3106_01EC_41A8_3BD8769525D6","Button_168DA310_3106_01EC_41BE_DF88732C2A28","Button_168DB310_3106_01EC_41B2_3511AA5E40E1","Button_168DD310_3106_01EC_4190_7815FA70349E","Button_168DE310_3106_01EC_4192_6A9F468A0ADE","Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2","Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B","Button_17562D7D_31FA_0015_41A3_96B282B30DBA","Button_17564D7D_31FA_0015_41B8_A9191CD56C52","Button_17565D7D_31FA_0015_4193_78BBCB2DC70F","Button_17566D7D_31FA_0015_41AD_98D7C60C694F","Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A","Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7","Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC","Button_1757AD7D_31FA_0015_41C7_FB79F56FA149","Button_1757CD7D_31FA_0015_4143_A9E37B16A50B","Button_1758B215_31FA_0014_41BC_C4EAC2A9544B","Button_17590215_31FA_0014_41C1_2B2D012DCC76","Button_17592215_31FA_0014_41B2_AA3B5CC318B8","Button_17593215_31FA_0014_41C0_42BAFB0080F0","Button_17596215_31FA_0014_41C6_A42670770708","Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6","Button_17598215_31FA_0014_41AC_1166AB319171","Button_1759A215_31FA_0014_41C7_F6B1044E5BB3","Button_1759D215_31FA_0014_41AD_B6C5744A0B97","Button_1759F215_31FA_0014_41BD_BBFA5FB0D882","Button_175A5214_31FA_0014_4198_930DF49BADD9","Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C","Button_17EAB2B7_3106_0014_41A7_209417AD3E9A","Button_17EAD2B7_3106_0014_41C0_0B5453B4841D","Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0","Button_17EB02B7_3106_0014_41AF_05D9AC36B189","Button_17EB32B7_3106_0014_41C8_467BF6AECBE8","Button_17EB42B7_3106_0014_41B0_CE70CBDDF438","Button_17EB52B7_3106_0014_419C_439E593AEC43","Button_17EB62B7_3106_0014_41C5_43B38271B353","Button_17EB72B7_3106_0014_41B9_61857077BF4A","Button_17EB92B7_3106_0014_41B2_34A3E3F63779","Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB","Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF","Button_2A2C053B_310E_001C_41A2_583DE489828C","Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E","Button_2A2C553C_310E_0014_41C4_86393D0ADCC7","Button_2A2C753B_310E_001C_41C4_B649CCC20E3D","Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D","Button_2A2DA53B_310E_001C_41C7_8885E712C50B","Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD","Button_3079F3B1_668B_F31E_41BD_ED7BF22BEABE","Button_307C43B6_668B_F302_41D8_19CC75D91652","Button_307C73B7_668B_F302_41D5_E0B2371C1C19","Button_307CE3B8_668B_F30E_41A8_3E1610390D7A","Button_307D33B5_668B_F306_41D0_671B339F3D6F","Button_307DC3B6_668B_F302_4189_0C64F68D71AF","Button_307E13B3_668B_F302_41BD_04F1F323654F","Button_307E33B4_668B_F306_41A7_5CF8CEF360E0","Button_307E93B4_668B_F306_41A6_CBD332630417","Button_307EB3B5_668B_F306_41C6_69C371344137","Button_307FA3B2_668B_F302_41C3_EC29309EC52E","Button_3550EB22_668A_9302_41D3_45A8C1831AAC","Button_5E2379D5_0AED_0845_419F_FAC0C7AE35C3","Button_5EDB5D95_0AED_08C5_4198_FC444CB963CB","Button_5EE9817F_0AED_1845_419E_AD81C5E4AB2C","Button_5F2E56FB_0AEF_184C_4185_46A681ECC599"];
  var GENERAL_LINES = ["Container_106C4A62_2D09_C594_41C0_0D00619DF541","Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F","Container_146FF082_2D09_C695_41C4_13DE74CDAF5E","Container_152401E8_2D0B_4694_41C5_9141C985F9C3","Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03","Container_15A14DDC_31FA_0014_41BE_C93192DD207E","Container_15A16DDC_31FA_0014_4199_0FBF7553300D","Container_168C8310_3106_01EC_4187_B16F315A4A23","Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4","Container_17578D7D_31FA_0015_41BE_353D3005648A","Container_17579D7D_31FA_0015_41A1_D2B94269F28D","Container_1759B215_31FA_0014_41C0_84C99CBD5517","Container_175A4215_31FA_0014_41B2_5B8676CC3F2F","Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7","Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E","Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89","Container_207ECEAD_3035_51EC_41A3_EE49910C654D","Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D","Container_2A2DB53B_310E_001C_41BA_0206228E495C","Container_3078A3B2_668B_F302_41D2_BE1899E71E17","Container_3078C3B2_668B_F302_41CF_9CA9F49C1F20","Container_35335FC4_668A_B303_41A0_B6E50ED69645"];
  var MOBILE_BUTTONS = ["Button_0399826A_2D79_4594_41BA_934A50D0E6B4_mobile","Button_0A054365_2D09_CB9F_4145_8C365B373D19_mobile","Button_0AEB5577_2D08_CE7B_41B6_192923248F4E_mobile","Button_0B73474A_2D18_CB95_41B5_180037BA80BC_mobile","Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9_mobile","Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA_mobile","Button_159E8DDD_31FA_0014_41C5_F18F441AF371_mobile","Button_159E9DDC_31FA_0015_41B6_CB1D433C7673_mobile","Button_159EBDDD_31FA_0014_41C8_935504B30727_mobile","Button_159ECDDC_31FA_0014_41B9_2D5AB1021813_mobile","Button_159EDDDC_31FA_0014_419A_61C18E43FE01_mobile","Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB_mobile","Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0_mobile","Button_15A10DDC_31FA_0014_4185_021C898E177D_mobile","Button_15A12DDC_31FA_0014_416B_ED845741AE5F_mobile","Button_15A13DDC_31FA_0014_41C5_41AE80876834_mobile","Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_mobile","Button_15EF2665_3106_0035_41AE_9BACA1A48D02_mobile","Button_15F5A318_3106_001C_41C5_9AA2EF2184CF_mobile","Button_168CA310_3106_01EC_41C7_72CE0522951A_mobile","Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3_mobile","Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA_mobile","Button_168D3310_3106_01EC_41AC_5D524E4677A5_mobile","Button_168D5310_3106_01EC_41B5_96D9387401B8_mobile","Button_168D6310_3106_01EC_41B8_A0B6BE627547_mobile","Button_168D9311_3106_01EC_41A8_3BD8769525D6_mobile","Button_168DA310_3106_01EC_41BE_DF88732C2A28_mobile","Button_168DB310_3106_01EC_41B2_3511AA5E40E1_mobile","Button_168DD310_3106_01EC_4190_7815FA70349E_mobile","Button_168DE310_3106_01EC_4192_6A9F468A0ADE_mobile","Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2_mobile","Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B_mobile","Button_17562D7D_31FA_0015_41A3_96B282B30DBA_mobile","Button_17564D7D_31FA_0015_41B8_A9191CD56C52_mobile","Button_17565D7D_31FA_0015_4193_78BBCB2DC70F_mobile","Button_17566D7D_31FA_0015_41AD_98D7C60C694F_mobile","Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A_mobile","Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7_mobile","Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC_mobile","Button_1757AD7D_31FA_0015_41C7_FB79F56FA149_mobile","Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_mobile","Button_1758B215_31FA_0014_41BC_C4EAC2A9544B_mobile","Button_17590215_31FA_0014_41C1_2B2D012DCC76_mobile","Button_17592215_31FA_0014_41B2_AA3B5CC318B8_mobile","Button_17593215_31FA_0014_41C0_42BAFB0080F0_mobile","Button_17596215_31FA_0014_41C6_A42670770708_mobile","Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6_mobile","Button_17598215_31FA_0014_41AC_1166AB319171_mobile","Button_1759A215_31FA_0014_41C7_F6B1044E5BB3_mobile","Button_1759D215_31FA_0014_41AD_B6C5744A0B97_mobile","Button_1759F215_31FA_0014_41BD_BBFA5FB0D882_mobile","Button_175A5214_31FA_0014_4198_930DF49BADD9_mobile","Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_mobile","Button_17EAB2B7_3106_0014_41A7_209417AD3E9A_mobile","Button_17EAD2B7_3106_0014_41C0_0B5453B4841D_mobile","Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0_mobile","Button_17EB02B7_3106_0014_41AF_05D9AC36B189_mobile","Button_17EB32B7_3106_0014_41C8_467BF6AECBE8_mobile","Button_17EB42B7_3106_0014_41B0_CE70CBDDF438_mobile","Button_17EB52B7_3106_0014_419C_439E593AEC43_mobile","Button_17EB62B7_3106_0014_41C5_43B38271B353_mobile","Button_17EB72B7_3106_0014_41B9_61857077BF4A_mobile","Button_17EB92B7_3106_0014_41B2_34A3E3F63779_mobile","Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB_mobile","Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF_mobile","Button_2A2C053B_310E_001C_41A2_583DE489828C_mobile","Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E_mobile","Button_2A2C553C_310E_0014_41C4_86393D0ADCC7_mobile","Button_2A2C753B_310E_001C_41C4_B649CCC20E3D_mobile","Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D_mobile","Button_2A2DA53B_310E_001C_41C7_8885E712C50B_mobile","Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD_mobile"];
  var MOBILE_LINES = ["Container_106C4A62_2D09_C594_41C0_0D00619DF541_mobile","Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F_mobile","Container_146FF082_2D09_C695_41C4_13DE74CDAF5E_mobile","Container_152401E8_2D0B_4694_41C5_9141C985F9C3_mobile","Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03_mobile","Container_15A14DDC_31FA_0014_41BE_C93192DD207E_mobile","Container_15A16DDC_31FA_0014_4199_0FBF7553300D_mobile","Container_168C8310_3106_01EC_4187_B16F315A4A23_mobile","Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4_mobile","Container_17578D7D_31FA_0015_41BE_353D3005648A_mobile","Container_17579D7D_31FA_0015_41A1_D2B94269F28D_mobile","Container_1759B215_31FA_0014_41C0_84C99CBD5517_mobile","Container_175A4215_31FA_0014_41B2_5B8676CC3F2F_mobile","Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7_mobile","Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E_mobile","Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89_mobile","Container_207ECEAD_3035_51EC_41A3_EE49910C654D_mobile","Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D_mobile","Container_2A2DB53B_310E_001C_41BA_0206228E495C_mobile"];
  var lastPlayer = null;

  function setProps(id, props) {
    try {
      if (!window.tour || !tour.player || typeof tour.player.getById !== 'function') return false;
      var c = tour.player.getById(id);
      if (!c || typeof c.set !== 'function') return false;
      Object.keys(props).forEach(function (key) { c.set(key, props[key]); });
      return true;
    } catch (e) { return false; }
  }

  function merge(a, b) {
    var o = {};
    Object.keys(a).forEach(function(k){ o[k]=a[k]; });
    Object.keys(b).forEach(function(k){ o[k]=b[k]; });
    return o;
  }

  function applyGlass() {
    if (!window.tour || !tour.player || typeof tour.player.getById !== 'function') return false;

    /* Main glass menu / left panel */
    setProps('Container_4521E58D_74A8_853A_418A_CF7FF914DD83', SOFT);
    setProps('Container_0B85764A_2D07_4D95_41A5_3AC872515A8C', PANEL);
    setProps('Container_21F34780_3014_BF93_41A2_9BF700588BEC', merge(PANEL, {backgroundOpacity:0.30,borderRadius:14,shadowBlurRadius:18,shadowVerticalLength:4}));

    setProps('Container_4521E58D_74A8_853A_418A_CF7FF914DD83_mobile', SOFT);
    setProps('Container_0B85764A_2D07_4D95_41A5_3AC872515A8C_mobile', PANEL);
    setProps('Container_21F34780_3014_BF93_41A2_9BF700588BEC_mobile', merge(PANEL, {backgroundOpacity:0.30,borderRadius:14,shadowBlurRadius:18,shadowVerticalLength:4}));

    /* Text/menu buttons. Events, click targets, and visibility are not modified. */
    GENERAL_BUTTONS.forEach(function(id){ setProps(id, BUTTON); });
    MOBILE_BUTTONS.forEach(function(id){ setProps(id, BUTTON); });

    var lineProps = {backgroundColor:['#FFFFFF','#FFFFFF'],backgroundOpacity:0.20};
    GENERAL_LINES.forEach(function(id){ setProps(id, lineProps); });
    MOBILE_LINES.forEach(function(id){ setProps(id, lineProps); });

    /* Desktop thumbnail strip */
    setProps('ThumbnailList_712DC795_525A_B430_4192_3598815A2903', merge(THUMB, {borderRadius:16,itemThumbnailBorderRadius:8}));
    setProps('Container_25444D7C_69BE_9706_41B4_2BC1740A2E6F', {
      backgroundColor:['#1D3143','#596C7E'],backgroundColorRatios:[0,1],backgroundColorDirection:'vertical',
      backgroundOpacity:0.34,backgroundBlur:0.74,borderRadius:16,borderSize:1,borderColor:'#DCEAF6',
      shadow:true,shadowColor:'#07111A',shadowOpacity:0.30,shadowBlurRadius:22,shadowVerticalLength:6,shadowSpread:0,
      backgroundImageUrl:''
    });
    setProps('Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15', {backgroundColor:['#101C28','#233748'],backgroundOpacity:0.16,backgroundBlur:0.12});
    setProps('Container_39A197B1_0C06_62AF_419A_D15E4DDD2528', SOFT);
    setProps('ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0', merge(THUMB, {backgroundOpacity:0.08,borderSize:0,shadow:false}));

    /* Premium welcome / intro overlay */
    setProps('Container_72F07872_4E67_B56E_41AF_74B31EEAE071', INTRO_BAR);
    setProps('Button_750AB6F8_4E6A_FD5A_41B8_3B00F4A4F566', INTRO_BUTTON);
    setProps('Button_705138BD_4E66_F5D5_41C7_67A1B6CC770D', INTRO_BUTTON);
    setProps('Label_70F181D7_4E6B_7756_4140_1349632BD541', merge(INTRO_TEXT, {textShadowBlurRadius:16,textShadowOpacity:0.30}));
    setProps('Label_73018A04_4E6E_F4AA_41BD_560BBAF3832B', merge(INTRO_TEXT, {fontWeight:'bold',textShadowBlurRadius:10}));
    setProps('Label_7316602C_4E69_74FA_41B0_7284F8EBFA04', merge(INTRO_TEXT, {fontWeight:'bold',textShadowBlurRadius:12}));

    /* Premium intro cards and info modal */
    setProps('Container_062AB830_1140_E215_41AF_6C9D65345420', {backgroundColor:['#08121B','#08121B'],backgroundOpacity:0.52,backgroundBlur:0.10});
    setProps('Container_062A782F_1140_E20B_41AF_B3E5DE341773', merge(MODAL, {backgroundOpacity:0.26,borderRadius:34,shadowBlurRadius:42,shadowVerticalLength:12}));
    setProps('Container_062A682F_1140_E20B_41B0_3071FCBF3DC9', merge(PANEL, {backgroundOpacity:0.18,borderSize:0,borderRadius:28,shadow:false}));
    setProps('Container_062A082F_1140_E20A_4193_DF1A4391DC79', merge(SOFT, {backgroundOpacity:0.08,borderSize:0,shadow:false,borderRadius:24}));
    setProps('Container_062A2830_1140_E215_41AA_EB25B7BD381C', merge(CARD, {backgroundOpacity:0.34,borderRadius:26,shadowBlurRadius:24,shadowVerticalLength:6}));
    setProps('Container_062A3830_1140_E215_4195_1698933FE51C', {backgroundOpacity:0,borderSize:0,shadow:false,backgroundBlur:0});
    setProps('Container_062AE830_1140_E215_4180_196ED689F4BD', {backgroundOpacity:0,borderSize:0,shadow:false,backgroundBlur:0});
    setProps('Button_062AF830_1140_E215_418D_D2FC11B12C47', merge(CTA, {backgroundOpacity:0.16,borderColor:'#DCECF8',shadow:false,fontStyle:'normal'}));
    setProps('Button_73A859D1_4E6F_77AA_41C2_D74B6095EB78', merge(CTA, {backgroundOpacity:0.78,borderRadius:999,shadowBlurRadius:22,shadowVerticalLength:6,fontSize:'18px'}));
    setProps('IconButton_062A8830_1140_E215_419D_3439F16CCB3E', {width:40,height:40,minWidth:36,minHeight:36,maxWidth:40,maxHeight:40,backgroundOpacity:0});
    setProps('Container_22BBC2F4_3075_D173_41B4_71F7A3560C34', merge(CARD, {backgroundOpacity:0.26,borderRadius:24,shadowBlurRadius:18}));
    setProps('Container_22BBD2F4_3075_D173_41B4_8504C593E6BF', merge(ACCENT, {backgroundOpacity:0.58,borderRadius:20}));
    setProps('Container_4F2B55F4_4EAF_9F6A_41A0_92F7676F7469', merge(CARD, {backgroundOpacity:0.26,borderRadius:24,shadowBlurRadius:18}));
    setProps('Container_4F2B55F4_4EAF_9F6A_41B2_AF8AEFB3B7AB', merge(ACCENT, {backgroundOpacity:0.58,borderRadius:20}));
    setProps('Container_22BBC2F4_3075_D173_41B4_71F7A3560C34_mobile', merge(CARD, {backgroundOpacity:0.28,borderRadius:24,shadowBlurRadius:18}));
    setProps('Container_22BBD2F4_3075_D173_41B4_8504C593E6BF_mobile', merge(ACCENT, {backgroundOpacity:0.58,borderRadius:20}));
    setProps('Container_22BB12F4_3075_D173_4184_EC3BC4955417_mobile', {backgroundOpacity:0});

    /* Mobile thumbnail grid */
    setProps('Container_4DED630D_5EE8_7957_41A7_FBD6C9555B5F', {backgroundColor:['#101C28','#233748'],backgroundOpacity:0.16,backgroundBlur:0.12});
    setProps('Container_4DED130D_5EE8_7957_41D2_959151C27821', merge(SOFT, {borderRadius:18,shadowBlurRadius:18}));
    setProps('ThumbnailGrid_4DED530D_5EE8_7957_41AC_FBA957C6B264', merge(THUMB, {backgroundOpacity:0.06,borderSize:0,shadow:false,borderRadius:12}));

    return true;
  }

  function tick() {
    try {
      if (!window.tour || !tour.player) return;
      if (tour.player !== lastPlayer) {
        lastPlayer = tour.player;
        /* A short delay lets 3DVista finish constructing visual layers. */
        setTimeout(applyGlass, 0);
        setTimeout(applyGlass, 250);
        setTimeout(applyGlass, 900);
      }
    } catch (e) {}
  }

  setInterval(tick, 500);
  window.addEventListener('load', function() { setTimeout(tick, 0); setTimeout(tick, 500); });
  window.addEventListener('orientationchange', function() { lastPlayer=null; setTimeout(tick, 500); });
})();
