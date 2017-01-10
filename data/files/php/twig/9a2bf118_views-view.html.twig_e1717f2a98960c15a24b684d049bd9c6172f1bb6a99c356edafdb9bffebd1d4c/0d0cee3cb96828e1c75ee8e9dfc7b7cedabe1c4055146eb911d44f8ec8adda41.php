<?php

/* core/themes/stable/templates/views/views-view.html.twig */
class __TwigTemplate_6b7c4ebc273753492be71a6c021e962f362d252e703b6eb28131f9f2056ba22b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 34, "if" => 43);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if'),
                array(),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 34
        $context["classes"] = array(0 => ((        // line 35
(isset($context["dom_id"]) ? $context["dom_id"] : null)) ? (("js-view-dom-id-" . (isset($context["dom_id"]) ? $context["dom_id"] : null))) : ("")));
        // line 38
        echo "<div";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
  ";
        // line 39
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["title_prefix"]) ? $context["title_prefix"] : null), "html", null, true));
        echo "
  ";
        // line 40
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true));
        echo "
  ";
        // line 41
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["title_suffix"]) ? $context["title_suffix"] : null), "html", null, true));
        echo "

  ";
        // line 43
        if ((isset($context["header"]) ? $context["header"] : null)) {
            // line 44
            echo "    <header>
      ";
            // line 45
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["header"]) ? $context["header"] : null), "html", null, true));
            echo "
    </header>
  ";
        }
        // line 48
        echo "
  ";
        // line 49
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["exposed"]) ? $context["exposed"] : null), "html", null, true));
        echo "
  ";
        // line 50
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["attachment_before"]) ? $context["attachment_before"] : null), "html", null, true));
        echo "

  ";
        // line 52
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["rows"]) ? $context["rows"] : null), "html", null, true));
        echo "
  ";
        // line 53
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["empty"]) ? $context["empty"] : null), "html", null, true));
        echo "
  ";
        // line 54
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["pager"]) ? $context["pager"] : null), "html", null, true));
        echo "

  ";
        // line 56
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["attachment_after"]) ? $context["attachment_after"] : null), "html", null, true));
        echo "
  ";
        // line 57
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["more"]) ? $context["more"] : null), "html", null, true));
        echo "

  ";
        // line 59
        if ((isset($context["footer"]) ? $context["footer"] : null)) {
            // line 60
            echo "    <footer>
      ";
            // line 61
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["footer"]) ? $context["footer"] : null), "html", null, true));
            echo "
    </footer>
  ";
        }
        // line 64
        echo "
  ";
        // line 65
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["feed_icons"]) ? $context["feed_icons"] : null), "html", null, true));
        echo "
</div>
";
    }

    public function getTemplateName()
    {
        return "core/themes/stable/templates/views/views-view.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  123 => 65,  120 => 64,  114 => 61,  111 => 60,  109 => 59,  104 => 57,  100 => 56,  95 => 54,  91 => 53,  87 => 52,  82 => 50,  78 => 49,  75 => 48,  69 => 45,  66 => 44,  64 => 43,  59 => 41,  55 => 40,  51 => 39,  46 => 38,  44 => 35,  43 => 34,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Theme override for main view template.*/
/*  **/
/*  * Available variables:*/
/*  * - attributes: Remaining HTML attributes for the element.*/
/*  * - css_name: A css-safe version of the view name.*/
/*  * - css_class: The user-specified classes names, if any.*/
/*  * - header: The optional header.*/
/*  * - footer: The optional footer.*/
/*  * - rows: The results of the view query, if any.*/
/*  * - empty: The content to display if there are no rows.*/
/*  * - pager: The optional pager next/prev links to display.*/
/*  * - exposed: Exposed widget form/info to display.*/
/*  * - feed_icons: Optional feed icons to display.*/
/*  * - more: An optional link to the next page of results.*/
/*  * - title: Title of the view, only used when displaying in the admin preview.*/
/*  * - title_prefix: Additional output populated by modules, intended to be*/
/*  *   displayed in front of the view title.*/
/*  * - title_suffix: Additional output populated by modules, intended to be*/
/*  *   displayed after the view title.*/
/*  * - attachment_before: An optional attachment view to be displayed before the*/
/*  *   view content.*/
/*  * - attachment_after: An optional attachment view to be displayed after the*/
/*  *   view content.*/
/*  * - dom_id: Unique id for every view being printed to give unique class for*/
/*  *   Javascript.*/
/*  **/
/*  * @see template_preprocess_views_view()*/
/*  *//* */
/* #}*/
/* {%*/
/*   set classes = [*/
/*     dom_id ? 'js-view-dom-id-' ~ dom_id,*/
/*   ]*/
/* %}*/
/* <div{{ attributes.addClass(classes) }}>*/
/*   {{ title_prefix }}*/
/*   {{ title }}*/
/*   {{ title_suffix }}*/
/* */
/*   {% if header %}*/
/*     <header>*/
/*       {{ header }}*/
/*     </header>*/
/*   {% endif %}*/
/* */
/*   {{ exposed }}*/
/*   {{ attachment_before }}*/
/* */
/*   {{ rows }}*/
/*   {{ empty }}*/
/*   {{ pager }}*/
/* */
/*   {{ attachment_after }}*/
/*   {{ more }}*/
/* */
/*   {% if footer %}*/
/*     <footer>*/
/*       {{ footer }}*/
/*     </footer>*/
/*   {% endif %}*/
/* */
/*   {{ feed_icons }}*/
/* </div>*/
/* */
