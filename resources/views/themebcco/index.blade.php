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
@php
    use Ophim\Core\Models\Movie;

    $recommendations = Cache::remember('site.movies.recommendations', setting('site_cache_ttl', 5 * 60), function () {
        return Movie::where('is_recommended', true)
            ->limit(get_theme_option('recommendations_limit', 10))
            ->orderBy('updated_at', 'desc')
            ->get();
    });

    $data = Cache::remember('site.movies.latest', setting('site_cache_ttl', 5 * 60), function () {
        $lists = preg_split('/[\n\r]+/', get_theme_option('latest'));
        $data = [];
        foreach ($lists as $list) {
            if (trim($list)) {
                $list = explode('|', $list);
                [$label, $relation, $field, $val, $limit, $link] = array_merge($list, ['Phim mới cập nhật', '', 'type', 'series', 8, '/']);
                try {
                    $data[] = [
                        'label' => $label,
                        'data' => Movie::when($relation, function ($query) use ($relation, $field, $val) {
                            $query->whereHas($relation, function ($rel) use ($field, $val) {
                                $rel->where($field, $val);
                            });
                        })
                            ->when(!$relation, function ($query) use ($field, $val) {
                                $query->where($field, $val);
                            })
                            ->limit($limit)
                            ->orderBy('updated_at', 'desc')
                            ->get(),
                        'link' => $link ?: '#',
                    ];
                } catch (\Exception $e) {
                }
            }
        }
        return $data;
    });

@endphp

@section('slider_recommended')
    @include('themes::themebcco.inc.slider_recommended')
@endsection

@section('content')
    <div class="playlist-container">
        @foreach ($data as $item)
            <div class="movie-blocks">
                <div class="movie-blocks__heading">
                    <div class="col-sm-8">
                        <h2 class="title">{{ $item['label'] }}</h2>
                    </div>

                </div>
                <div class="movie-list" >
                    @foreach ($item['data'] as $movie)
                        @include('themes::themebcco.inc.movie_card')
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
@endsection

@push('scripts')
    <script>
        $(function() {
            var banner = $(".bn-carousel").flickity({
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                groupCells: true,
                autoPlay: 3500,
                wrapAround: true,
                bgLazyLoad: 1
            });
            var flkty = banner.data('flickity');
            var $imgs = banner.find(".bn-carousel-img");
            banner.on('scroll.flickity', function(event, progress) {
                flkty.slides.forEach(function(slide, i) {
                    var img = $imgs[i];
                    var x = (slide.target + flkty.x) * -1 / 3;
                    img.style.transform = 'translateX( ' + x + 'px)';
                });
            });
        });
    </script>
@endpush
