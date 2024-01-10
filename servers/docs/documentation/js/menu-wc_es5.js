'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  var _super = _createSuper(_class);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">aq54 documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/ApiProxyModule.html\" data-type=\"entity-link\" >ApiProxyModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-fc0fb91ee440718926dd71dff2c2d15d762180a03e3b27fb131c7bef9c10ec82771f9825892fafb68375dd499b84bf12d493a548ac79cc134a374464b68483ee"' : 'data-bs-target="#xs-components-links-module-AppModule-fc0fb91ee440718926dd71dff2c2d15d762180a03e3b27fb131c7bef9c10ec82771f9825892fafb68375dd499b84bf12d493a548ac79cc134a374464b68483ee"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-fc0fb91ee440718926dd71dff2c2d15d762180a03e3b27fb131c7bef9c10ec82771f9825892fafb68375dd499b84bf12d493a548ac79cc134a374464b68483ee"' : 'id="xs-components-links-module-AppModule-fc0fb91ee440718926dd71dff2c2d15d762180a03e3b27fb131c7bef9c10ec82771f9825892fafb68375dd499b84bf12d493a548ac79cc134a374464b68483ee"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AboutCandidateComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AboutCandidateComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/FeaturesModule.html\" data-type=\"entity-link\" >FeaturesModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' : 'data-bs-target="#xs-components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' : 'id="xs-components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/DiferredDataChartComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DiferredDataChartComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RealTimeChartComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RealTimeChartComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/FeaturesRoutingModule.html\" data-type=\"entity-link\" >FeaturesRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' : 'data-bs-target="#xs-components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' : 'id="xs-components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ChartsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ChartsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FooterComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/HeaderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HeaderComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/ApiResourceService.html\" data-type=\"entity-link\" >ApiResourceService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DiferredModeUsecases.html\" data-type=\"entity-link\" >DiferredModeUsecases</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/GetRangeUsecase.html\" data-type=\"entity-link\" >GetRangeUsecase</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/GetStationCurrentValuesService.html\" data-type=\"entity-link\" >GetStationCurrentValuesService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/GetStationSessionInfoUsecasesService.html\" data-type=\"entity-link\" >GetStationSessionInfoUsecasesService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/IsLoadingService.html\" data-type=\"entity-link\" >IsLoadingService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RealTimeUseCases.html\" data-type=\"entity-link\" >RealTimeUseCases</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interceptors-links"' : 'data-bs-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/Aq54HttpInterceptor.html\" data-type=\"entity-link\" >Aq54HttpInterceptor</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ApiInterface.html\" data-type=\"entity-link\" >ApiInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CurrentValuesSchema.html\" data-type=\"entity-link\" >CurrentValuesSchema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LatestTransmissionsResponseScema.html\" data-type=\"entity-link\" >LatestTransmissionsResponseScema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/OninitResponseSchema.html\" data-type=\"entity-link\" >OninitResponseSchema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RangeDataSchema.html\" data-type=\"entity-link\" >RangeDataSchema</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/SessionInfoSchema.html\" data-type=\"entity-link\" >SessionInfoSchema</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));