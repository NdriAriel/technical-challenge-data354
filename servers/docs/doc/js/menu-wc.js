'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">aq54 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiProxyModule.html" data-type="entity-link" >ApiProxyModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-0babd53b505454e51f223166354a38da940714177049ebfca92c358af5400252d54f0509c83cbfcdef186d33a347011b93f294a9ad17d9c264095c16035c63cb"' : 'data-bs-target="#xs-components-links-module-AppModule-0babd53b505454e51f223166354a38da940714177049ebfca92c358af5400252d54f0509c83cbfcdef186d33a347011b93f294a9ad17d9c264095c16035c63cb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0babd53b505454e51f223166354a38da940714177049ebfca92c358af5400252d54f0509c83cbfcdef186d33a347011b93f294a9ad17d9c264095c16035c63cb"' :
                                            'id="xs-components-links-module-AppModule-0babd53b505454e51f223166354a38da940714177049ebfca92c358af5400252d54f0509c83cbfcdef186d33a347011b93f294a9ad17d9c264095c16035c63cb"' }>
                                            <li class="link">
                                                <a href="components/AboutCandidateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutCandidateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesModule.html" data-type="entity-link" >FeaturesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' : 'data-bs-target="#xs-components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' :
                                            'id="xs-components-links-module-FeaturesModule-d48b194a66478a1b6e59bf1718e01326fd14a10e11c7d6a31a2d17cfb0599e4e4acdbbc2701c9f147f49adc3cfb52fd5c4fddab2dec7296a32d339921a545a66"' }>
                                            <li class="link">
                                                <a href="components/DiferredDataChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiferredDataChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RealTimeChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RealTimeChartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesRoutingModule.html" data-type="entity-link" >FeaturesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' : 'data-bs-target="#xs-components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' :
                                            'id="xs-components-links-module-SharedModule-faeff49b0b49e93c23ce6ee6994376b3620382b1f7281ce3e47244bfe31e03a074ce214c080e1b3811c497e26dfdc70c8a74b1a288c342f8c793ba6a9db4caea"' }>
                                            <li class="link">
                                                <a href="components/ChartsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiResourceService.html" data-type="entity-link" >ApiResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiferredModeUsecases.html" data-type="entity-link" >DiferredModeUsecases</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetRangeUsecase.html" data-type="entity-link" >GetRangeUsecase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetStationCurrentValuesService.html" data-type="entity-link" >GetStationCurrentValuesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetStationSessionInfoUsecasesService.html" data-type="entity-link" >GetStationSessionInfoUsecasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsLoadingService.html" data-type="entity-link" >IsLoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RealTimeUseCases.html" data-type="entity-link" >RealTimeUseCases</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/Aq54HttpInterceptor.html" data-type="entity-link" >Aq54HttpInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiInterface.html" data-type="entity-link" >ApiInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrentValuesSchema.html" data-type="entity-link" >CurrentValuesSchema</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LatestTransmissionsResponseScema.html" data-type="entity-link" >LatestTransmissionsResponseScema</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OninitResponseSchema.html" data-type="entity-link" >OninitResponseSchema</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangeDataSchema.html" data-type="entity-link" >RangeDataSchema</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SessionInfoSchema.html" data-type="entity-link" >SessionInfoSchema</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});