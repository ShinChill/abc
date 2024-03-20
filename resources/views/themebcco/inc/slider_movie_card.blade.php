<article class="movie-item">
    <a href="{{ $movie->getUrl() }}" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" aria-label="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})">
        <thumb class="movie-image" aria-label="thumbnail">
            <img decoding="async" src="{{ $movie->getThumbUrl() }}" alt="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" class="lazyloaded" data-ll-status="loaded"><noscript><img decoding="async" src="url({{ $movie->getThumbUrl() }})" alt="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" /></noscript>            <span class="movie-badge">
                <span class="badge badge-episode">Vietsub</span><span class="badge badge-status badge-success">Hoàn thành</span>            </span>
        </thumb>
        <summary class="movie-summary" aria-label="movie title">
            <span>{{ $movie->name }}</span>            <h3>{{ $movie->origin_name }} ({{ $movie->publish_year }})</h3>
        </summary>
    </a>
</article>