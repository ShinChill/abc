<aside class="sidebar"> 
        @foreach ($tops as $top)
        <div id="widget-area" class="widget-area" role="complementary">
        <div id="mv-widget-5" class="widget widget_mv-widget">
                <h2 class="widget-title">
                   {{ $top['label'] }}
                </h2>
    <ul class="post-with-thumbnail">
    @foreach ($top['data'] as $movie)
            <li>
                <a href="{{ $movie->getUrl() }}" title="{{ $movie->name }}">
                <img src="{{ $movie->getThumbUrl() }}" alt="{{ $movie->name }}" title="{{ $movie->name }}" class="lazyloaded" data-ll-status="loaded"><noscript>
                <img src="{{ $movie->getThumbUrl() }}" alt="{{ $movie->name }}" title="{{ $movie->name }}" /></noscript>
                <p class="post-info">
                <span class="post-title">{{ $movie->name }}</span>
                <span class="post-name">{{$movie->origin_name}}</span>
                </p>
                </a>
            </li>  
    @endforeach 
            </ul>             
            </div>
   
        </div>
    @endforeach

</aside>
