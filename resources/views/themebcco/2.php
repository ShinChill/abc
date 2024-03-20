@extends('themes::themebcco.layout')
@php
    $menu = \Ophim\Core\Models\Menu::getTree();
    $tops = Cache::remember('site.movies.tops', setting('site_cache_ttl', 5 * 60), function () {
        $lists = preg_split('/[\n\r]+/', get_theme_option('hotest'));
        $data = [];
        foreach ($lists as $list) {
            if (trim($list)) {
                $list = explode('|', $list);
                [$label, $relation, $field, $val, $sortKey, $alg, $limit, $template] = array_merge($list, ['Phim hot', '', 'type', 'series', 'view_total', 'desc', 4, 'top_thumb']);
                try {
                    $data[] = [
                        'label' => $label,
                        'template' => $template,
                        'data' => \Ophim\Core\Models\Movie::when($relation, function ($query) use ($relation, $field, $val) {
                            $query->whereHas($relation, function ($rel) use ($field, $val) {
                                $rel->where($field, $val);
                            });
                        })
                            ->when(!$relation, function ($query) use ($field, $val) {
                                $query->where($field, $val);
                            })
                            ->orderBy($sortKey, $alg)
                            ->limit($limit)
                            ->get(),
                    ];
                } catch (\Exception $e) {
                    # code
                }
            }
        }

        return $data;
    });
@endphp
@push('header')
    <link href="{{ asset('/themes/bcco/css/single.css') }}" rel="stylesheet">
@endpush
    <nav id="main-mobile-nav"></nav>
    <div class="page-wrapper">
        @include('themes::themebcco.inc.header')
        <main class="site-main site-with-sidebar">
            @yield('slider_recommended')
    <div class="container">
       <section class="sidecontent">
       <div class="breadcrumbs" vocab="https://schema.org/" typeof="BreadcrumbList">
        <ul xmlns:v="http://rdf.data-vocabulary.org/#">
            <li property="itemListElement" typeof="ListItem">
                <a href="/" property="item" typeof="WebPage">
                <span property="name">Xem phim</span></a>
                <meta property="position" content="1">
            </li>
            <li property="itemListElement" typeof="ListItem">
                <a href="{{ $currentMovie->regions->first()->getUrl() }}" property="item" typeof="WebPage">
                <span property="name">{{ $currentMovie->regions->first()->name }}</span></a>
                <meta property="position" content="2">
            </li>
            <li property="itemListElement" typeof="ListItem">
                <span class="last" property="name">{{ $currentMovie->name }}</span>
                <meta property="position" content="3"></li>
        </ul>
</div>
    <div class="post-summary">
                    <div class="post-thumbnail">
                        <img 
                            alt="{{ $currentMovie->name }} | {{ $currentMovie->origin_name }} ({{ $currentMovie->publish_year }})"
                            src="{{ $currentMovie->getThumbUrl() }}" class="lazyloaded" data-ll-status="loaded">
                    
                    <div class="post-links">  
                        @if (!$currentMovie->is_copyright && count($currentMovie->episodes) && $currentMovie->episodes[0]['link'] != '')
                        @if ($currentMovie->trailer_url)
                        <a tite="Trailer phim {{ $currentMovie->name }}" onclick="trailer();"
                            class="post-links__trailer button">
                                Trailer
                        </a>
                        @endif
                         <a href="{{ $currentMovie->episodes->sortBy([['server', 'asc']])->groupBy('server')->first()->sortByDesc('name', SORT_NATURAL)->groupBy('name')->last()->sortByDesc('type')->first()->getUrl() }}" rel="canonical"  class="post-links__watch button">Xem Phim</a>
                            </div>
                        @else
                        <a href="/" rel="canonical"  class="post-links__watch button">Đang cập nhật</a> </div>
                        @endif

                    </div>
                    <div class="post-info">
                    <h1>{{ $currentMovie->name }}</h1>
                    <h3> {{ $currentMovie->origin_name }} ({{ $currentMovie->publish_year }})</h3>
                        <ul class="list-unstyled">

                        <li class="post-rating">
                            <div class="box-rating" itemprop="aggregateRating" itemscope
                                itemtype="https://schema.org/AggregateRating">

                                <div id="star" data-score="{{$currentMovie->getRatingStar()}}"
                                    style="cursor: pointer;"></div>
                                <div>
                                    <div id="div_average" style="line-height: 16px; margin: 0 5px; ">
                                        <span id="hint">

                                        </span>
                               <!--          ( <span class="average" id="average"
                                            itemprop="ratingValue">
                                            {{$currentMovie->getRatingStar()}}</span>&nbsp;điểm
                                        /&nbsp; <span id="rate_count"
                                            itemprop="ratingCount">{{$currentMovie->getRatingCount()}}</span>
                                        &nbsp;lượt) -->
                                    </div>
                                    <meta itemprop="bestRating" content="10" />
                                </div>
                        </li>
                        <li>Trạng thái: <span class="post-text post-text__success">{{ $currentMovie->episode_current }}</span></li>
                        <li>Số tập: <span class="post-label post-label__success">{{ $currentMovie->episode_total }} </span> </li>
                        <li>Chất lượng: <span class="post-label post-label__success">HD </span> </li>
                        <li>Ngôn ngữ: <span class="post-label post-label__danger">{{ $currentMovie->language }} </span> </li>
                        <li>Năm sản xuất: {{ $currentMovie->publish_year }}</li>
                        <li>Thời lượng: {{ $currentMovie->episode_time }}</li>
                        <li>Thể loại:
                        {!! $currentMovie->categories->map(function ($category) {
                                        return '<a href="' . $category->getUrl() . '" rel="tag" tite="' . $category->name . '">' . $category->name . '</a>';
                                    })->implode(', ') !!}
                        </li>
                        <li>Quốc gia: 
                        {!! $currentMovie->regions->map(function ($region) {
                                        return '<a href="' . $region->getUrl() . '" rel="tag" tite="' . $region->name . '">' . $region->name . '</a>';
                                    })->implode(', ') !!}
                        </li>
                        <li>Ngày cập nhật: {{ $currentMovie->publish_year }}  </li>
                        <li>Lượt xem: 1 </li>
                        </ul>
                    </div>


                        @if ($currentMovie->notify && $currentMovie->notify != '')
                            <div class="alert alert-info fade show" role="alert">
                                Thông báo: <span class="text-danger">{{ strip_tags($currentMovie->notify) }}</span>
                            </div>
                        @endif
                        @if ($currentMovie->showtimes && $currentMovie->showtimes != '')
                            <div class="alert alert-primary fade show" role="alert">
                                Lịch chiếu: <span class="text-info">{!! $currentMovie->showtimes !!}</span>
                            </div>
                        @endif

            </div>
            <div class="post-content post-block-content">
            <h3 class="post-content__heading">Nội dung phim</h3>
              
                 
                    @if ($currentMovie->content)
                        <p> {{ $currentMovie->name }}, {{ $currentMovie->origin_name }} ({{ $currentMovie->publish_year }}) {!! $currentMovie->content !!}</p>
                    @else
                        <p>Hãy xem phim để cảm nhận...</p>
                    @endif

                    <div class="movie-detail-h3">Từ khóa:</div>
                <div class="tag-list">
                    @foreach ($currentMovie->tags as $tag)
                        <h3>
                            <strong>
                                <a href='{{ $tag->getUrl() }}' title='{{ $tag->name }}'
                                    rel='tag'>T{{ $tag->name }}</a>
                            </strong>
                        </h3>
                    @endforeach
                </div>
            </div>
            <div class="post-content post-block-content">
            <h3 class="post-content__heading">Bình luận phim</h3>
                <div style="color:red;font-weight:bold;padding:5px">Lưu ý các bạn không nên nhấp vào các đường link ở phần
                    bình luận, kẻ gian có thể đưa virut vào thiết bị hoặc hack mất facebook của các bạn. </div>
                <div data-order-by="reverse_time" class="fb-comments"
                    data-href="{{ $currentMovie->getUrl() }}" data-width="100%" data-numposts="10"></div>
            </div>
            <div class="post-related">
            <h3 class="post-related__heading">Có thể bạn quan tâm</h3>
               <div class="post-blocks__swiper">

            <div class="swiper swiper-carousel swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden" id="swiper-related" data-columns="{&quot;0&quot;:{&quot;slidesPerView&quot;:2},&quot;768&quot;:{&quot;slidesPerView&quot;:3},&quot;1200&quot;:{&quot;slidesPerView&quot;:4},&quot;1400&quot;:{&quot;slidesPerView&quot;:5}}">

            @foreach ($movie_related as $movie)
            <div class="swiper-wrapper" id="swiper-wrapper" aria-live="off" style="transform: translate3d(-678px, 0px, 0px); transition-duration: 0ms;">

            <article class="movie-item swiper-slide swiper-slide-prev"  style="width: 187.5px; margin-right: 20px;">
              <a href="{{ $movie->getUrl() }}" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" aria-label="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})">
                   <thumb class="movie-image" aria-label="thumbnail">
                           <img decoding="async" src="{{ $movie->getThumbUrl() }}" alt="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" class="lazyloaded" data-ll-status="loaded"><noscript><img decoding="async" src="url({{ $movie->getThumbUrl() }})" alt="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" title="{{ $movie->name }} | {{ $movie->origin_name }} ({{ $movie->publish_year }})" /></noscript>
                              <span class="movie-badge">
                                  <span class="badge badge-episode">Vietsub</span><span class="badge badge-status badge-success">{{$movie->episode_current}}</span>            </span>
                   </thumb>
               <summary class="movie-summary" aria-label="movie title">
                    <span>{{ $movie->name }}</span> 
                <h3>{{ $movie->origin_name }} ({{ $movie->publish_year }})</h3>
               </summary>
               </a>
            </article>
           @endforeach
           <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
              </div>
                </div> 
            </div>
            </section>
                        @include('themes::themebcco.inc.aside')
                </div>
            </div>

        </main>
<!-- Include Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
  // Khởi tạo Swiper
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Số lượng slide hiển thị trên mỗi lần cuộn
    spaceBetween: 20, // Khoảng cách giữa các slide
    navigation: {
      nextEl: '.swiper-button-next', // Nút chuyển slide tiếp theo
      prevEl: '.swiper-button-prev', // Nút chuyển slide trước đó
    },
  });
</script>



@push('scripts')
    <link href="{{ asset('/themes/bcco/libs/raty/jquery.raty.css') }}" rel="stylesheet" />
    <script src="{{ asset('/themes/bcco/libs/raty/jquery.raty.js') }}"></script>
    <script>
        var rated = false;
        $('#star').raty({
            number: 10,
            starHalf: '/themes/bcco/libs/raty/images/star-half.png',
            starOff: '/themes/bcco/libs/raty/images/star-off.png',
            starOn: '/themes/bcco/libs/raty/images/star-on.png',
            click: function(score, evt) {
                if (!rated) {
                    $.ajax({
                        url: '{{ route('movie.rating', ['movie' => $currentMovie->slug]) }}',
                        data: JSON.stringify({
                            rating: score
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            'X-CSRF-TOKEN': document.querySelector(
                                    'meta[name="csrf-token"]')
                                .getAttribute(
                                    'content')
                        },
                        type: 'post',
                        dataType: 'json',
                        success: function(res) {
                            $('#average').html(res.rating_star);
                            $('#rate_count').html(res.rating_count);
                            $('#star').attr('data-score', res.rating_star);
                            rated = true;
                        }
                    });
                }
            }
        });
    </script>

    {!! setting('site_scripts_facebook_sdk') !!}
@endpush
